// =============================================
// BOOKING SYSTEM TYPES
// =============================================

export interface Organization {
  id: string;
  name: string;
  slug: string;
  email: string;
  timezone: string;
  logo_url?: string;
  primary_color: string;
  booking_duration: number;
  buffer_before: number;
  buffer_after: number;
  max_advance_days: number;
  created_at: string;
  updated_at: string;
}

export interface AvailabilityRule {
  id: string;
  organization_id: string;
  day_of_week: number; // 0=Sunday, 1=Monday, etc.
  start_time: string; // HH:MM format
  end_time: string;
  is_available: boolean;
}

export interface DateOverride {
  id: string;
  organization_id: string;
  date: string; // YYYY-MM-DD
  is_available: boolean;
  start_time?: string;
  end_time?: string;
  reason?: string;
}

export interface Booking {
  id: string;
  organization_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_company?: string;
  customer_notes?: string;
  start_time: string;
  end_time: string;
  duration: number;
  status: 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  zoom_meeting_id?: string;
  zoom_meeting_url?: string;
  zoom_meeting_password?: string;
  google_event_id?: string;
  source: 'website' | 'admin' | 'api';
  created_at: string;
  updated_at: string;
  cancelled_at?: string;
  cancellation_reason?: string;
}

export interface TimeSlot {
  time: string; // ISO timestamp
  display: string; // "9:00 AM"
  available: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
}

export interface CreateBookingRequest {
  organization_slug: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_company?: string;
  customer_notes?: string;
  start_time: string; // ISO timestamp
}

export interface CreateBookingResponse {
  success: boolean;
  booking?: Booking;
  zoom_url?: string;
  error?: string;
}

// =============================================
// API RESPONSE TYPES
// =============================================

export interface AvailabilityResponse {
  organization: Organization;
  dates: {
    date: string;
    day_name: string;
    slots: TimeSlot[];
  }[];
}

export interface BookingConfirmation {
  booking: Booking;
  organization: Organization;
  zoom_meeting_url?: string;
  zoom_meeting_password?: string;
  calendar_event_url?: string;
}
