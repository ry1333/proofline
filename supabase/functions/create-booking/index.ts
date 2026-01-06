// Supabase Edge Function: Create Booking
// Handles: Database insert + Zoom meeting + Email confirmation

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BookingRequest {
  organization_slug: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  customer_company?: string
  customer_notes?: string
  start_time: string
}

// =============================================
// ZOOM INTEGRATION
// =============================================
async function createZoomMeeting(topic: string, startTime: string, duration: number) {
  const clientId = Deno.env.get('ZOOM_CLIENT_ID')
  const clientSecret = Deno.env.get('ZOOM_CLIENT_SECRET')
  const accountId = Deno.env.get('ZOOM_ACCOUNT_ID')

  if (!clientId || !clientSecret || !accountId) {
    console.log('Zoom not configured, skipping meeting creation')
    return null
  }

  try {
    // Get access token
    const tokenRes = await fetch('https://zoom.us/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=account_credentials&account_id=${accountId}`,
    })

    if (!tokenRes.ok) {
      console.error('Failed to get Zoom token:', await tokenRes.text())
      return null
    }

    const { access_token } = await tokenRes.json()

    // Create meeting
    const meetingRes = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration,
        timezone: 'America/Denver',
        settings: {
          join_before_host: true,
          waiting_room: false,
          audio: 'both',
          auto_recording: 'none',
        },
      }),
    })

    if (!meetingRes.ok) {
      console.error('Failed to create Zoom meeting:', await meetingRes.text())
      return null
    }

    const meeting = await meetingRes.json()
    return {
      id: String(meeting.id),
      url: meeting.join_url,
      password: meeting.password,
    }
  } catch (error) {
    console.error('Zoom error:', error)
    return null
  }
}

// =============================================
// EMAIL INTEGRATION (Resend)
// =============================================
async function sendConfirmationEmail(
  to: string,
  customerName: string,
  startTime: string,
  duration: number,
  zoomUrl?: string,
  zoomPassword?: string,
  orgName?: string
) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY')

  if (!resendApiKey) {
    console.log('Resend not configured, skipping email')
    return false
  }

  const meetingDate = new Date(startTime)
  const formattedDate = meetingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = meetingDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Denver',
  })

  const zoomSection = zoomUrl ? `
    <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0 0 8px 0; font-weight: bold;">Join Zoom Meeting:</p>
      <p style="margin: 0;"><a href="${zoomUrl}" style="color: #00a86b;">${zoomUrl}</a></p>
      ${zoomPassword ? `<p style="margin: 8px 0 0 0; font-size: 14px; color: #666;">Password: ${zoomPassword}</p>` : ''}
    </div>
  ` : ''

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${orgName || 'ProofLine'} <hello@proofline.co>`,
        to: [to],
        subject: `Your ${duration}-minute call is confirmed!`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="border-bottom: 3px solid #00FF94; padding-bottom: 20px; margin-bottom: 20px;">
              <h1 style="color: #000; margin: 0;">Meeting Confirmed!</h1>
            </div>

            <p>Hi ${customerName},</p>

            <p>Your ${duration}-minute discovery call has been scheduled:</p>

            <div style="background: #000; color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 18px;"><strong>${formattedDate}</strong></p>
              <p style="margin: 8px 0 0 0; font-size: 24px; color: #00FF94;">${formattedTime} MT</p>
            </div>

            ${zoomSection}

            <p>We're looking forward to speaking with you!</p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

            <p style="font-size: 12px; color: #999;">
              Need to reschedule or cancel? Reply to this email and we'll help you out.
            </p>
          </body>
          </html>
        `,
      }),
    })

    if (!res.ok) {
      console.error('Failed to send email:', await res.text())
      return false
    }

    return true
  } catch (error) {
    console.error('Email error:', error)
    return false
  }
}

// Send notification to admin/organization
async function sendAdminNotification(
  orgEmail: string,
  customerName: string,
  customerEmail: string,
  customerCompany: string | undefined,
  customerNotes: string | undefined,
  startTime: string,
  duration: number,
  zoomUrl?: string
) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY')

  if (!resendApiKey) return false

  const meetingDate = new Date(startTime)
  const formattedDate = meetingDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  const formattedTime = meetingDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ProofLine Bookings <hello@proofline.co>',
        to: [orgEmail],
        subject: `New Booking: ${customerName} - ${formattedDate} ${formattedTime}`,
        html: `
          <h2>New Booking</h2>
          <p><strong>${customerName}</strong> booked a ${duration}-minute call.</p>
          <ul>
            <li><strong>Date:</strong> ${formattedDate} at ${formattedTime}</li>
            <li><strong>Email:</strong> ${customerEmail}</li>
            ${customerCompany ? `<li><strong>Company:</strong> ${customerCompany}</li>` : ''}
            ${customerNotes ? `<li><strong>Notes:</strong> ${customerNotes}</li>` : ''}
            ${zoomUrl ? `<li><strong>Zoom:</strong> <a href="${zoomUrl}">${zoomUrl}</a></li>` : ''}
          </ul>
        `,
      }),
    })
    return true
  } catch (error) {
    console.error('Admin email error:', error)
    return false
  }
}

// =============================================
// MAIN HANDLER
// =============================================
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const body: BookingRequest = await req.json()

    // 1. Get organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .eq('slug', body.organization_slug)
      .single()

    if (orgError || !org) {
      return new Response(
        JSON.stringify({ success: false, error: 'Organization not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    // 2. Calculate end time
    const startTime = new Date(body.start_time)
    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + org.booking_duration)

    // 3. Check availability
    const { data: conflicts } = await supabase
      .from('bookings')
      .select('id')
      .eq('organization_id', org.id)
      .eq('status', 'confirmed')
      .lt('start_time', endTime.toISOString())
      .gt('end_time', startTime.toISOString())

    if (conflicts && conflicts.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'This time slot is no longer available' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 409 }
      )
    }

    // 4. Create Zoom meeting
    const zoomMeeting = await createZoomMeeting(
      `${org.booking_duration}-min Call with ${body.customer_name}`,
      body.start_time,
      org.booking_duration
    )

    // 5. Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        organization_id: org.id,
        customer_name: body.customer_name,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone,
        customer_company: body.customer_company,
        customer_notes: body.customer_notes,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration: org.booking_duration,
        status: 'confirmed',
        source: 'website',
        zoom_meeting_id: zoomMeeting?.id,
        zoom_meeting_url: zoomMeeting?.url,
        zoom_meeting_password: zoomMeeting?.password,
      })
      .select()
      .single()

    if (bookingError) {
      console.error('Booking error:', bookingError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to create booking' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // 6. Send confirmation emails (async, don't wait)
    sendConfirmationEmail(
      body.customer_email,
      body.customer_name,
      body.start_time,
      org.booking_duration,
      zoomMeeting?.url,
      zoomMeeting?.password,
      org.name
    )

    sendAdminNotification(
      org.email,
      body.customer_name,
      body.customer_email,
      body.customer_company,
      body.customer_notes,
      body.start_time,
      org.booking_duration,
      zoomMeeting?.url
    )

    // 7. Log email
    if (Deno.env.get('RESEND_API_KEY')) {
      await supabase.from('email_logs').insert({
        booking_id: booking.id,
        email_type: 'confirmation',
        recipient_email: body.customer_email,
        subject: `Your ${org.booking_duration}-minute call is confirmed!`,
        status: 'sent',
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        booking,
        zoom_url: zoomMeeting?.url,
        zoom_password: zoomMeeting?.password,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
