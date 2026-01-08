// Supabase Edge Function: Form Notification
// Sends SMS when a form is submitted (audit request, contact form, etc.)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FormNotificationRequest {
  form_type: 'audit' | 'contact'
  name: string
  email: string
  business?: string
  website?: string
  phone?: string
  goal?: string
  message?: string
}

async function sendSms(message: string) {
  const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
  const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')
  const twilioPhone = Deno.env.get('TWILIO_PHONE_NUMBER')
  const notifyPhone = Deno.env.get('NOTIFY_PHONE_NUMBER')

  if (!accountSid || !authToken || !twilioPhone || !notifyPhone) {
    console.log('Twilio not configured')
    return false
  }

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: notifyPhone,
          From: twilioPhone,
          Body: message,
        }),
      }
    )

    if (!res.ok) {
      console.error('SMS failed:', await res.text())
      return false
    }

    return true
  } catch (error) {
    console.error('SMS error:', error)
    return false
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body: FormNotificationRequest = await req.json()

    let message = ''

    if (body.form_type === 'audit') {
      message = `🔍 AUDIT REQUEST!\n\n${body.name}\n📧 ${body.email}${body.business ? `\n🏢 ${body.business}` : ''}${body.website ? `\n🌐 ${body.website}` : ''}${body.goal ? `\n🎯 ${body.goal}` : ''}`
    } else {
      message = `📬 NEW CONTACT!\n\n${body.name}\n📧 ${body.email}${body.business ? `\n🏢 ${body.business}` : ''}${body.phone ? `\n📱 ${body.phone}` : ''}${body.goal ? `\n🎯 ${body.goal}` : ''}${body.message ? `\n💬 ${body.message.substring(0, 100)}${body.message.length > 100 ? '...' : ''}` : ''}`
    }

    const sent = await sendSms(message)

    return new Response(
      JSON.stringify({ success: true, sms_sent: sent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'Internal error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
