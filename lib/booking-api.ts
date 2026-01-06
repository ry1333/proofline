import { supabase, isSupabaseConfigured } from './supabase';
import type {
  Organization,
  AvailabilityRule,
  DateOverride,
  Booking,
  TimeSlot,
  CreateBookingRequest,
  CreateBookingResponse,
  AvailabilityResponse,
} from './booking-types';

// =============================================
// ORGANIZATION
// =============================================

export async function getOrganization(slug: string): Promise<Organization | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching organization:', error);
    return null;
  }

  return data;
}

// =============================================
// AVAILABILITY
// =============================================

export async function getAvailabilityRules(organizationId: string): Promise<AvailabilityRule[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from('availability_rules')
    .select('*')
    .eq('organization_id', organizationId)
    .order('day_of_week');

  if (error) {
    console.error('Error fetching availability rules:', error);
    return [];
  }

  return data || [];
}

export async function getDateOverrides(
  organizationId: string,
  startDate: string,
  endDate: string
): Promise<DateOverride[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from('date_overrides')
    .select('*')
    .eq('organization_id', organizationId)
    .gte('date', startDate)
    .lte('date', endDate);

  if (error) {
    console.error('Error fetching date overrides:', error);
    return [];
  }

  return data || [];
}

export async function getBookedSlots(
  organizationId: string,
  startDate: string,
  endDate: string
): Promise<Booking[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('status', 'confirmed')
    .gte('start_time', startDate)
    .lte('start_time', endDate);

  if (error) {
    console.error('Error fetching booked slots:', error);
    return [];
  }

  return data || [];
}

// =============================================
// SLOT GENERATION
// =============================================

function generateTimeSlots(
  date: Date,
  startTime: string,
  endTime: string,
  duration: number,
  timezone: string,
  bookedSlots: Booking[]
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  for (let mins = startMinutes; mins < endMinutes; mins += duration) {
    const hour = Math.floor(mins / 60);
    const minute = mins % 60;

    const slotDate = new Date(date);
    slotDate.setHours(hour, minute, 0, 0);

    const slotEndDate = new Date(slotDate);
    slotEndDate.setMinutes(slotEndDate.getMinutes() + duration);

    // Check if slot is in the past
    const now = new Date();
    if (slotDate <= now) {
      continue;
    }

    // Check if slot is already booked
    const isBooked = bookedSlots.some((booking) => {
      const bookingStart = new Date(booking.start_time);
      const bookingEnd = new Date(booking.end_time);
      return slotDate < bookingEnd && slotEndDate > bookingStart;
    });

    // Format display time
    const displayTime = slotDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    slots.push({
      time: slotDate.toISOString(),
      display: displayTime,
      available: !isBooked,
    });
  }

  return slots;
}

export async function getAvailableSlots(
  slug: string,
  startDate: Date,
  days: number = 7
): Promise<AvailabilityResponse | null> {
  const org = await getOrganization(slug);
  if (!org) return null;

  const rules = await getAvailabilityRules(org.id);

  // Create a map of day -> rule
  const rulesByDay = new Map<number, AvailabilityRule>();
  rules.forEach((rule) => rulesByDay.set(rule.day_of_week, rule));

  // Get date range
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days);

  // Get overrides and booked slots
  const overrides = await getDateOverrides(
    org.id,
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  );
  const overridesByDate = new Map<string, DateOverride>();
  overrides.forEach((o) => overridesByDate.set(o.date, o));

  const bookedSlots = await getBookedSlots(
    org.id,
    startDate.toISOString(),
    endDate.toISOString()
  );

  // Generate slots for each day
  const dates: AvailabilityResponse['dates'] = [];

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dateStr = currentDate.toISOString().split('T')[0];
    const dayOfWeek = currentDate.getDay();
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });

    // Check for override
    const override = overridesByDate.get(dateStr);
    if (override && !override.is_available) {
      // Day is blocked
      dates.push({ date: dateStr, day_name: dayName, slots: [] });
      continue;
    }

    // Get rule for this day
    const rule = rulesByDay.get(dayOfWeek);
    if (!rule || !rule.is_available) {
      dates.push({ date: dateStr, day_name: dayName, slots: [] });
      continue;
    }

    // Use override times if available
    const startTime = override?.start_time || rule.start_time;
    const endTime = override?.end_time || rule.end_time;

    // Generate slots
    const slots = generateTimeSlots(
      currentDate,
      startTime,
      endTime,
      org.booking_duration,
      org.timezone,
      bookedSlots
    );

    dates.push({ date: dateStr, day_name: dayName, slots });
  }

  return { organization: org, dates };
}

// =============================================
// BOOKING CREATION
// =============================================

export async function createBooking(
  request: CreateBookingRequest
): Promise<CreateBookingResponse> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Booking system not configured' };
  }

  try {
    // Try Edge Function first (handles Zoom + Email)
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/create-booking`;

    try {
      const response = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify(request),
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          booking: result.booking,
          zoom_url: result.zoom_url,
        };
      }

      // If Edge Function returns an error, return it
      if (result.error) {
        return { success: false, error: result.error };
      }
    } catch (edgeError) {
      console.log('Edge Function not available, falling back to direct insert');
    }

    // Fallback: Direct database insert (no Zoom/Email)
    const org = await getOrganization(request.organization_slug);
    if (!org) {
      return { success: false, error: 'Organization not found' };
    }

    const startTime = new Date(request.start_time);
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + org.booking_duration);

    // Check availability
    const existingBookings = await supabase
      .from('bookings')
      .select('id')
      .eq('organization_id', org.id)
      .eq('status', 'confirmed')
      .lt('start_time', endTime.toISOString())
      .gt('end_time', startTime.toISOString());

    if (existingBookings.data && existingBookings.data.length > 0) {
      return { success: false, error: 'This time slot is no longer available' };
    }

    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        organization_id: org.id,
        customer_name: request.customer_name,
        customer_email: request.customer_email,
        customer_phone: request.customer_phone,
        customer_company: request.customer_company,
        customer_notes: request.customer_notes,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration: org.booking_duration,
        status: 'confirmed',
        source: 'website',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating booking:', error);
      return { success: false, error: 'Failed to create booking' };
    }

    return {
      success: true,
      booking,
    };
  } catch (err) {
    console.error('Booking error:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// =============================================
// BOOKING MANAGEMENT
// =============================================

export async function cancelBooking(
  bookingId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Booking system not configured' };
  }

  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      cancellation_reason: reason,
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Error cancelling booking:', error);
    return { success: false, error: 'Failed to cancel booking' };
  }

  // TODO: Cancel Zoom meeting
  // TODO: Remove Google Calendar event
  // TODO: Send cancellation email

  return { success: true };
}

export async function getBookingByEmail(email: string): Promise<Booking[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('customer_email', email)
    .order('start_time', { ascending: false });

  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }

  return data || [];
}

// =============================================
// DEMO MODE (when Supabase not configured)
// =============================================

export function getDemoAvailability(startDate: Date, days: number = 7): AvailabilityResponse {
  const demoOrg: Organization = {
    id: 'demo',
    name: 'ProofLine',
    slug: 'proofline',
    email: 'hello@proofline.co',
    timezone: 'America/Denver',
    primary_color: '#00FF94',
    booking_duration: 15,
    buffer_before: 0,
    buffer_after: 5,
    max_advance_days: 30,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const dates: AvailabilityResponse['dates'] = [];
  const demoSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
  ];

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dayOfWeek = currentDate.getDay();
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });

    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      dates.push({ date: dateStr, day_name: dayName, slots: [] });
      continue;
    }

    // Generate demo slots
    const slots: TimeSlot[] = demoSlots.map((display, idx) => {
      const [time, period] = display.split(' ');
      const [hour, minute] = time.split(':').map(Number);
      const hour24 = period === 'PM' && hour !== 12 ? hour + 12 : hour;

      const slotDate = new Date(currentDate);
      slotDate.setHours(hour24, minute, 0, 0);

      // Randomly mark some as unavailable for demo
      const available = slotDate > new Date() && Math.random() > 0.2;

      return {
        time: slotDate.toISOString(),
        display,
        available,
      };
    });

    dates.push({ date: dateStr, day_name: dayName, slots });
  }

  return { organization: demoOrg, dates };
}
