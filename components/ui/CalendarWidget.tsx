import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Calendar, Check } from 'lucide-react';

interface CalendarWidgetProps {
  calendlyUrl: string;
  onTimeSelect?: (date: Date, time: string) => void;
}

// Available time slots (customize based on your availability)
const TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

// Days to show (Mon-Fri)
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ calendlyUrl }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(today.setDate(diff));
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

  // Load Calendly widget script
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setIsCalendlyLoaded(true);
      document.body.appendChild(script);

      // Load Calendly CSS
      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    } else {
      setIsCalendlyLoaded(true);
    }
  }, []);

  const getWeekDates = () => {
    const dates: Date[] = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
      return newDate;
    });
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleDateSelect = (date: Date) => {
    if (!isPast(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      // Format date for Calendly
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      // Try Calendly popup first, fallback to new tab
      if (isCalendlyLoaded && (window as any).Calendly) {
        (window as any).Calendly.initPopupWidget({
          url: `${calendlyUrl}?date=${dateStr}&primary_color=00ff94`,
          prefill: {},
          utm: {},
        });
      } else {
        // Fallback: open Calendly in new tab with date
        window.open(`${calendlyUrl}?date=${dateStr}`, '_blank');
      }
    }
  };

  const weekDates = getWeekDates();

  return (
    <div className="relative bg-brand-dark border border-brand-border overflow-hidden">
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent"></div>

      {/* Header */}
      <div className="p-4 border-b border-brand-border bg-brand-panel">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 text-gray-500 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-brand-accent" />
            <span className="font-mono text-sm text-white uppercase tracking-wider">
              {formatMonth(currentWeekStart)}
            </span>
          </div>

          <button
            onClick={() => navigateWeek('next')}
            className="p-2 text-gray-500 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors"
            aria-label="Next week"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-5 border-b border-brand-border">
        {weekDates.map((date, idx) => {
          const past = isPast(date);
          const today = isToday(date);
          const selected = isSelected(date);

          return (
            <button
              key={idx}
              onClick={() => handleDateSelect(date)}
              disabled={past}
              className={`
                relative p-3 text-center transition-all duration-200 border-r border-brand-border last:border-r-0
                ${past ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-brand-accent/10'}
                ${selected ? 'bg-brand-accent/20' : ''}
              `}
            >
              {/* Today indicator */}
              {today && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
              )}

              <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${selected ? 'text-brand-accent' : 'text-gray-500'}`}>
                {WEEKDAYS[idx]}
              </div>
              <div className={`text-lg font-bold ${selected ? 'text-brand-accent' : past ? 'text-gray-600' : 'text-white'}`}>
                {date.getDate()}
              </div>

              {/* Selection indicator */}
              {selected && (
                <motion.div
                  layoutId="date-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent"
                  initial={false}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Time Slots */}
      <AnimatePresence mode="wait">
        {selectedDate ? (
          <motion.div
            key="times"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock size={12} className="text-brand-accent" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                Available Times
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((time) => {
                const isSelectedTime = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`
                      relative px-3 py-2 text-sm font-mono transition-all duration-200
                      border ${isSelectedTime ? 'border-brand-accent bg-brand-accent/20 text-brand-accent' : 'border-brand-border text-gray-400 hover:border-brand-accent/50 hover:text-white'}
                    `}
                  >
                    {isSelectedTime && (
                      <Check size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-accent" />
                    )}
                    {time}
                  </button>
                );
              })}
            </div>

            {/* Confirm Button */}
            <AnimatePresence>
              {selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4"
                >
                  <button
                    onClick={handleConfirm}
                    className="w-full py-3 bg-brand-accent text-brand-dark font-bold font-mono text-xs uppercase tracking-wider hover:bg-brand-accent/90 hover:shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all"
                  >
                    Confirm & Book
                  </button>
                  <p className="mt-2 font-mono text-[9px] text-gray-600 text-center uppercase">
                    You'll finalize details in the next step
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 text-center"
          >
            <div className="text-gray-500 text-sm">Select a date to see available times</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status bar */}
      <div className="px-4 py-2 border-t border-brand-border bg-brand-panel/50">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">
            // 15-min discovery call
          </span>
          <span className="font-mono text-[9px] text-brand-accent uppercase tracking-wider">
            {selectedDate && selectedTime
              ? `${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} @ ${selectedTime}`
              : 'No selection'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
