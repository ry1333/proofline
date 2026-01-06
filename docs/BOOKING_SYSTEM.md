# ProofLine Booking System

A custom multi-tenant booking system that replaces Calendly. Features real-time availability, Zoom meeting creation, Google Calendar sync, and email confirmations.

## Features

- **Custom Dark Theme** - Matches your FUI/HUD aesthetic
- **Multi-Tenant** - Use for ProofLine + offer to clients
- **Real-Time Availability** - Shows actual available slots
- **Zoom Integration** - Auto-creates meeting links
- **Google Calendar Sync** - Adds events to your calendar
- **Email Confirmations** - Sends customer & admin notifications
- **Demo Mode** - Works without Supabase for testing

## Quick Start

### 1. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migration:
   ```
   supabase/migrations/001_booking_system.sql
   ```
3. Get your project URL and anon key from Settings > API

### 2. Configure Environment

Create `.env` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Test the Booking Widget

Visit `/contact` - the booking widget will now show real availability from your database.

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `organizations` | ProofLine + client companies |
| `availability_rules` | Weekly availability (Mon-Fri 9-5) |
| `date_overrides` | Block specific dates (holidays, vacation) |
| `bookings` | Customer appointments |
| `email_logs` | Track sent emails |

### Default Setup

The migration creates:
- ProofLine organization (slug: `proofline`)
- Mon-Fri 9am-5pm availability
- 15-minute meeting duration

## Customizing Availability

### Change Available Hours

Update in Supabase:
```sql
UPDATE availability_rules
SET start_time = '10:00', end_time = '16:00'
WHERE organization_id = (SELECT id FROM organizations WHERE slug = 'proofline');
```

### Block a Date

```sql
INSERT INTO date_overrides (organization_id, date, is_available, reason)
VALUES (
  (SELECT id FROM organizations WHERE slug = 'proofline'),
  '2024-12-25',
  false,
  'Christmas'
);
```

### Change Meeting Duration

```sql
UPDATE organizations
SET booking_duration = 30
WHERE slug = 'proofline';
```

## Adding Zoom Integration

### 1. Create Zoom App

1. Go to [marketplace.zoom.us](https://marketplace.zoom.us)
2. Create a Server-to-Server OAuth app
3. Add scopes: `meeting:write:admin`
4. Get credentials

### 2. Create Supabase Edge Function

Create `supabase/functions/create-zoom-meeting/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { topic, start_time, duration } = await req.json()

  // Get Zoom access token
  const tokenRes = await fetch('https://zoom.us/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(`${Deno.env.get('ZOOM_CLIENT_ID')}:${Deno.env.get('ZOOM_CLIENT_SECRET')}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=account_credentials&account_id=${Deno.env.get('ZOOM_ACCOUNT_ID')}`,
  })
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
      type: 2,
      start_time,
      duration,
      settings: {
        join_before_host: true,
        waiting_room: false,
      },
    }),
  })

  return new Response(JSON.stringify(await meetingRes.json()))
})
```

### 3. Deploy Function

```bash
supabase functions deploy create-zoom-meeting
supabase secrets set ZOOM_CLIENT_ID=xxx ZOOM_CLIENT_SECRET=xxx ZOOM_ACCOUNT_ID=xxx
```

## Adding Email Notifications

### 1. Set Up Resend

1. Create account at [resend.com](https://resend.com)
2. Verify your domain
3. Get API key

### 2. Create Edge Function

Create `supabase/functions/send-booking-email/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  const { to, booking, zoom_url } = await req.json()

  await resend.emails.send({
    from: 'ProofLine <hello@proofline.co>',
    to,
    subject: 'Your meeting is confirmed!',
    html: `
      <h1>Meeting Confirmed</h1>
      <p>Your 15-minute call is scheduled for:</p>
      <p><strong>${new Date(booking.start_time).toLocaleString()}</strong></p>
      ${zoom_url ? `<p><a href="${zoom_url}">Join Zoom Meeting</a></p>` : ''}
    `,
  })

  return new Response(JSON.stringify({ success: true }))
})
```

## Multi-Tenant Setup (For Clients)

### 1. Add New Organization

```sql
INSERT INTO organizations (name, slug, email, timezone, primary_color)
VALUES ('Acme Corp', 'acme-corp', 'contact@acme.com', 'America/New_York', '#FF6B6B');

-- Add their availability
INSERT INTO availability_rules (organization_id, day_of_week, start_time, end_time, is_available)
SELECT
  (SELECT id FROM organizations WHERE slug = 'acme-corp'),
  day,
  '09:00'::TIME,
  '17:00'::TIME,
  CASE WHEN day IN (0, 6) THEN false ELSE true END
FROM generate_series(0, 6) AS day;
```

### 2. Use Widget on Client Site

```tsx
<BookingWidget organizationSlug="acme-corp" />
```

## File Structure

```
lib/
├── supabase.ts          # Supabase client
├── booking-types.ts     # TypeScript types
└── booking-api.ts       # API functions

components/booking/
└── BookingWidget.tsx    # Main booking component

supabase/
└── migrations/
    └── 001_booking_system.sql  # Database schema
```

## API Reference

### `getAvailableSlots(slug, startDate, days)`
Returns available time slots for an organization.

### `createBooking(request)`
Creates a new booking and returns confirmation.

### `cancelBooking(bookingId, reason)`
Cancels an existing booking.

### `getBookingByEmail(email)`
Retrieves all bookings for a customer email.

## Demo Mode

When Supabase is not configured, the widget runs in demo mode:
- Shows simulated availability
- Simulates booking creation
- Displays demo banner

This is useful for development and showcasing the system.
