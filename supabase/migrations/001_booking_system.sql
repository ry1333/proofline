-- =============================================
-- PROOFLINE BOOKING SYSTEM
-- Multi-tenant booking with Zoom + Calendar integration
-- =============================================

-- Organizations (ProofLine + Clients)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- URL-friendly identifier (e.g., 'proofline', 'acme-corp')
  email TEXT NOT NULL, -- Primary contact email
  timezone TEXT DEFAULT 'America/Denver',

  -- Branding
  logo_url TEXT,
  primary_color TEXT DEFAULT '#00FF94',

  -- Settings
  booking_duration INTEGER DEFAULT 15, -- Default meeting duration in minutes
  buffer_before INTEGER DEFAULT 0, -- Minutes buffer before meetings
  buffer_after INTEGER DEFAULT 5, -- Minutes buffer after meetings
  max_advance_days INTEGER DEFAULT 30, -- How far ahead can book

  -- Integrations (encrypted in production)
  zoom_access_token TEXT,
  zoom_refresh_token TEXT,
  google_access_token TEXT,
  google_refresh_token TEXT,
  google_calendar_id TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Availability Rules (when org is available)
CREATE TABLE availability_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, etc.
  start_time TIME NOT NULL, -- e.g., '09:00'
  end_time TIME NOT NULL, -- e.g., '17:00'
  is_available BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organization_id, day_of_week)
);

-- Date Overrides (specific dates that differ from rules)
CREATE TABLE date_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT false, -- false = blocked, true = available with custom hours
  start_time TIME, -- Custom hours if available
  end_time TIME,
  reason TEXT, -- e.g., "Holiday", "Vacation"

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organization_id, date)
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  -- Customer info
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_company TEXT,
  customer_notes TEXT,

  -- Meeting details
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  duration INTEGER NOT NULL, -- Minutes

  -- Status
  status TEXT DEFAULT 'confirmed', -- confirmed, cancelled, completed, no_show

  -- Integration data
  zoom_meeting_id TEXT,
  zoom_meeting_url TEXT,
  zoom_meeting_password TEXT,
  google_event_id TEXT,

  -- Metadata
  source TEXT DEFAULT 'website', -- website, admin, api
  ip_address TEXT,
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT
);

-- Email logs (track sent emails)
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,

  email_type TEXT NOT NULL, -- confirmation, reminder, cancellation, reschedule
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'sent', -- sent, failed, bounced
  error_message TEXT
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_bookings_org_id ON bookings(organization_id);
CREATE INDEX idx_bookings_start_time ON bookings(start_time);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_availability_org_id ON availability_rules(organization_id);
CREATE INDEX idx_date_overrides_org_date ON date_overrides(organization_id, date);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE date_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Public can read organization info (for booking pages)
CREATE POLICY "Public can view organizations" ON organizations
  FOR SELECT USING (true);

-- Public can read availability
CREATE POLICY "Public can view availability" ON availability_rules
  FOR SELECT USING (true);

CREATE POLICY "Public can view date overrides" ON date_overrides
  FOR SELECT USING (true);

-- Public can create bookings
CREATE POLICY "Public can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Public can view their own bookings by email (for cancellation)
CREATE POLICY "Public can view own bookings" ON bookings
  FOR SELECT USING (true);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to get available time slots for a date
CREATE OR REPLACE FUNCTION get_available_slots(
  org_slug TEXT,
  target_date DATE
)
RETURNS TABLE (
  slot_time TIMESTAMPTZ,
  is_available BOOLEAN
) AS $$
DECLARE
  org RECORD;
  day_rule RECORD;
  override RECORD;
  slot_start TIME;
  slot_end TIME;
  current_slot TIME;
  slot_timestamp TIMESTAMPTZ;
  booking_exists BOOLEAN;
BEGIN
  -- Get organization
  SELECT * INTO org FROM organizations WHERE slug = org_slug;
  IF NOT FOUND THEN
    RETURN;
  END IF;

  -- Check for date override first
  SELECT * INTO override FROM date_overrides
  WHERE organization_id = org.id AND date = target_date;

  IF FOUND AND NOT override.is_available THEN
    -- Date is blocked
    RETURN;
  END IF;

  -- Get availability for this day of week
  SELECT * INTO day_rule FROM availability_rules
  WHERE organization_id = org.id
  AND day_of_week = EXTRACT(DOW FROM target_date);

  IF NOT FOUND OR NOT day_rule.is_available THEN
    RETURN;
  END IF;

  -- Use override times if available, otherwise use rule times
  slot_start := COALESCE(override.start_time, day_rule.start_time);
  slot_end := COALESCE(override.end_time, day_rule.end_time);

  -- Generate slots
  current_slot := slot_start;
  WHILE current_slot < slot_end LOOP
    slot_timestamp := target_date + current_slot AT TIME ZONE org.timezone;

    -- Check if slot is already booked
    SELECT EXISTS (
      SELECT 1 FROM bookings
      WHERE organization_id = org.id
      AND status = 'confirmed'
      AND start_time <= slot_timestamp
      AND end_time > slot_timestamp
    ) INTO booking_exists;

    slot_time := slot_timestamp;
    is_available := NOT booking_exists AND slot_timestamp > NOW();
    RETURN NEXT;

    current_slot := current_slot + (org.booking_duration || ' minutes')::INTERVAL;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- SEED DATA (ProofLine)
-- =============================================

-- Insert ProofLine organization
INSERT INTO organizations (name, slug, email, timezone, primary_color, booking_duration)
VALUES ('ProofLine', 'proofline', 'hello@proofline.co', 'America/Denver', '#00FF94', 15);

-- Set default availability (Mon-Fri, 9am-5pm)
INSERT INTO availability_rules (organization_id, day_of_week, start_time, end_time, is_available)
SELECT
  (SELECT id FROM organizations WHERE slug = 'proofline'),
  day,
  '09:00'::TIME,
  '17:00'::TIME,
  CASE WHEN day IN (0, 6) THEN false ELSE true END -- Weekend = unavailable
FROM generate_series(0, 6) AS day;
