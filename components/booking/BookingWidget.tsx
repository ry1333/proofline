import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Check,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Video,
} from 'lucide-react';
import {
  getAvailableSlots,
  getDemoAvailability,
  createBooking,
} from '../../lib/booking-api';
import type { AvailabilityResponse, TimeSlot, BookingFormData } from '../../lib/booking-types';
import { isSupabaseConfigured as checkSupabase } from '../../lib/supabase';

interface BookingWidgetProps {
  organizationSlug?: string;
  onBookingComplete?: (booking: any) => void;
}

type Step = 'calendar' | 'form' | 'success';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const BookingWidget: React.FC<BookingWidgetProps> = ({
  organizationSlug = 'proofline',
  onBookingComplete,
}) => {
  const [step, setStep] = useState<Step>('calendar');
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
    date: '',
    time: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<any>(null);

  // Fetch availability for the month
  useEffect(() => {
    async function fetchAvailability() {
      setLoading(true);
      try {
        // Fetch 42 days to cover full month grid
        const startDate = new Date(currentMonth);
        startDate.setDate(1 - startDate.getDay()); // Start from Sunday of first week

        if (checkSupabase()) {
          const data = await getAvailableSlots(organizationSlug, startDate, 42);
          setAvailability(data);
        } else {
          const demo = getDemoAvailability(startDate, 42);
          setAvailability(demo);
        }
      } catch (err) {
        console.error('Error fetching availability:', err);
      }
      setLoading(false);
    }

    fetchAvailability();
  }, [currentMonth, organizationSlug]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Generate calendar days for the month grid
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay(); // 0-6

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month days
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    // Next month days to fill the grid (6 rows x 7 days = 42)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const getAvailabilityForDate = (date: Date) => {
    if (!availability) return null;
    const dateStr = date.toISOString().split('T')[0];
    return availability.dates.find((d) => d.date === dateStr);
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleContinueToForm = () => {
    if (selectedSlot && selectedDate) {
      setFormData((prev) => ({
        ...prev,
        date: selectedDate,
        time: selectedSlot.time,
      }));
      setStep('form');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (!checkSupabase()) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setBookingResult({
          id: 'demo-' + Date.now(),
          zoom_url: 'https://zoom.us/j/1234567890',
        });
        setStep('success');
        onBookingComplete?.({ demo: true });
      } else {
        const result = await createBooking({
          organization_slug: organizationSlug,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_company: formData.company,
          customer_notes: formData.notes,
          start_time: formData.time,
        });

        if (result.success) {
          setBookingResult(result);
          setStep('success');
          onBookingComplete?.(result);
        } else {
          setError(result.error || 'Failed to create booking');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }

    setSubmitting(false);
  };

  const selectedDateData = availability?.dates.find((d) => d.date === selectedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarDays = getCalendarDays();

  // =============================================
  // RENDER: CALENDAR STEP
  // =============================================
  const renderCalendar = () => (
    <>
      {/* Header */}
      <div className="p-4 border-b border-brand-border bg-brand-panel">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-gray-500 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-brand-accent" />
            <span className="font-mono text-sm text-white uppercase tracking-wider">
              {formatMonth(currentMonth)}
            </span>
          </div>

          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-gray-500 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="p-8 flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-brand-accent" />
        </div>
      ) : (
        <>
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-brand-border">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="p-2 text-center font-mono text-[10px] text-gray-500 uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((dayInfo, idx) => {
              const dateStr = dayInfo.date.toISOString().split('T')[0];
              const dayAvailability = getAvailabilityForDate(dayInfo.date);
              const hasSlots = dayAvailability?.slots.some((s) => s.available) || false;
              const isPast = dayInfo.date < today;
              const isSelected = selectedDate === dateStr;
              const isToday = dayInfo.date.toDateString() === today.toDateString();

              return (
                <button
                  key={idx}
                  onClick={() => hasSlots && !isPast && handleDateSelect(dateStr)}
                  disabled={!hasSlots || isPast || !dayInfo.isCurrentMonth}
                  className={`
                    relative p-2 min-h-[44px] text-center transition-all duration-200
                    border-b border-r border-brand-border
                    ${idx % 7 === 0 ? 'border-l-0' : ''}
                    ${!dayInfo.isCurrentMonth ? 'opacity-30' : ''}
                    ${isPast || !hasSlots ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-brand-accent/10'}
                    ${isSelected ? 'bg-brand-accent/20' : ''}
                  `}
                >
                  {/* Today indicator */}
                  {isToday && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
                  )}

                  <div
                    className={`text-sm font-medium ${
                      isSelected
                        ? 'text-brand-accent'
                        : !dayInfo.isCurrentMonth
                        ? 'text-gray-700'
                        : isPast || !hasSlots
                        ? 'text-gray-600'
                        : 'text-white'
                    }`}
                  >
                    {dayInfo.date.getDate()}
                  </div>

                  {/* Available indicator */}
                  {hasSlots && !isPast && dayInfo.isCurrentMonth && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-accent/50 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Time Slots */}
          <AnimatePresence mode="wait">
            {selectedDate && selectedDateData ? (
              <motion.div
                key="times"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 border-t border-brand-border"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={12} className="text-brand-accent" />
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                    Available Times for{' '}
                    {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                  {selectedDateData.slots.map((slot) => {
                    const isSelectedSlot = selectedSlot?.time === slot.time;
                    return (
                      <button
                        key={slot.time}
                        onClick={() => handleSlotSelect(slot)}
                        disabled={!slot.available}
                        className={`
                          relative px-2 py-1.5 text-xs font-mono transition-all duration-200
                          border ${
                            !slot.available
                              ? 'border-brand-border/50 text-gray-600 cursor-not-allowed line-through'
                              : isSelectedSlot
                              ? 'border-brand-accent bg-brand-accent/20 text-brand-accent'
                              : 'border-brand-border text-gray-400 hover:border-brand-accent/50 hover:text-white'
                          }
                        `}
                      >
                        {isSelectedSlot && (
                          <Check
                            size={10}
                            className="absolute right-0.5 top-1/2 -translate-y-1/2 text-brand-accent"
                          />
                        )}
                        {slot.display}
                      </button>
                    );
                  })}
                </div>

                {/* Continue Button */}
                <AnimatePresence>
                  {selectedSlot && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4"
                    >
                      <button
                        onClick={handleContinueToForm}
                        className="w-full py-3 bg-brand-accent text-brand-dark font-bold font-mono text-xs uppercase tracking-wider hover:bg-brand-accent/90 hover:shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all"
                      >
                        Continue
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : !selectedDate ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 text-center border-t border-brand-border"
              >
                <div className="text-gray-500 text-sm">Select a date to see available times</div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      )}

      {/* Status bar */}
      <div className="px-4 py-2 border-t border-brand-border bg-brand-panel/50">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">
            // {availability?.organization.booking_duration || 15}-min call
          </span>
          <span className="font-mono text-[9px] text-brand-accent uppercase tracking-wider">
            {selectedSlot && selectedDate
              ? `${new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })} @ ${selectedSlot.display}`
              : 'No selection'}
          </span>
        </div>
      </div>
    </>
  );

  // =============================================
  // RENDER: FORM STEP
  // =============================================
  const renderForm = () => (
    <form onSubmit={handleSubmitBooking} className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-brand-border bg-brand-panel flex items-center gap-3">
        <button
          type="button"
          onClick={() => setStep('calendar')}
          className="p-1 text-gray-500 hover:text-brand-accent transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <div className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
            Booking for
          </div>
          <div className="text-white font-bold">
            {selectedSlot &&
              `${new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })} at ${selectedSlot.display}`}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            <User size={12} /> Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
            placeholder="Your name"
            className="w-full px-3 py-2 bg-black/50 border border-brand-border text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            <Mail size={12} /> Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            required
            placeholder="you@company.com"
            className="w-full px-3 py-2 bg-black/50 border border-brand-border text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors text-sm"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            <Phone size={12} /> Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            placeholder="(optional)"
            className="w-full px-3 py-2 bg-black/50 border border-brand-border text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors text-sm"
          />
        </div>

        {/* Company */}
        <div>
          <label className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            <Building size={12} /> Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleFormChange}
            placeholder="(optional)"
            className="w-full px-3 py-2 bg-black/50 border border-brand-border text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors text-sm"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            <MessageSquare size={12} /> What would you like to discuss?
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleFormChange}
            placeholder="Tell us about your project..."
            rows={3}
            className="w-full px-3 py-2 bg-black/50 border border-brand-border text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors text-sm resize-none"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle size={14} />
            {error}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="p-4 border-t border-brand-border">
        <button
          type="submit"
          disabled={submitting || !formData.name || !formData.email}
          className="w-full py-3 bg-brand-accent text-brand-dark font-bold font-mono text-xs uppercase tracking-wider hover:bg-brand-accent/90 hover:shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Booking...
            </>
          ) : (
            <>
              <Check size={14} />
              Confirm Booking
            </>
          )}
        </button>
        <p className="mt-2 font-mono text-[9px] text-gray-600 text-center uppercase">
          You'll receive a confirmation email with Zoom link
        </p>
      </div>
    </form>
  );

  // =============================================
  // RENDER: SUCCESS STEP
  // =============================================
  const renderSuccess = () => (
    <div className="p-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-accent/20 flex items-center justify-center"
      >
        <CheckCircle size={32} className="text-brand-accent" />
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h3>

      <p className="text-gray-400 text-sm mb-4">
        We've sent a confirmation email to <strong className="text-white">{formData.email}</strong>{' '}
        with all the details.
      </p>

      <div className="bg-brand-panel border border-brand-border p-4 mb-4 text-left">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="font-mono text-[10px] text-gray-500 uppercase">Date</div>
            <div className="text-white">
              {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-gray-500 uppercase">Time</div>
            <div className="text-white">{selectedSlot?.display}</div>
          </div>
        </div>

        {bookingResult?.zoom_url && (
          <div className="mt-3 pt-3 border-t border-brand-border">
            <div className="font-mono text-[10px] text-gray-500 uppercase mb-1">Zoom Link</div>
            <a
              href={bookingResult.zoom_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-accent hover:underline text-sm"
            >
              <Video size={14} />
              Join Meeting
            </a>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setStep('calendar');
          setSelectedDate(null);
          setSelectedSlot(null);
          setFormData({ name: '', email: '', phone: '', company: '', notes: '', date: '', time: '' });
        }}
        className="text-gray-500 hover:text-brand-accent text-sm transition-colors"
      >
        Book another time
      </button>
    </div>
  );

  // =============================================
  // MAIN RENDER
  // =============================================
  return (
    <div className="relative bg-brand-dark border border-brand-border overflow-hidden flex flex-col">
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent"></div>

      {/* Demo banner */}
      {!checkSupabase() && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-4 py-2">
          <span className="font-mono text-[10px] text-yellow-500 uppercase tracking-wider">
            // Demo Mode - Connect Supabase for real bookings
          </span>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 flex flex-col"
            >
              {renderCalendar()}
            </motion.div>
          )}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              {renderForm()}
            </motion.div>
          )}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1"
            >
              {renderSuccess()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingWidget;
