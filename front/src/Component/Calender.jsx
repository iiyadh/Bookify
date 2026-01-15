import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  X,
  Clock,
  User,
  Package,
  Info
} from 'lucide-react';
import api from '../api/instance';

const Calendar = ({
  selectedDate = null,
  onDateSelect = () => {},
  onMonthChange = () => {},
  minDate = null,
  maxDate = null,
  disabledDates = [],
  showWeekNumbers = false,
  highlightToday = true,
  className = '',
  startOfWeek = 0,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selected, setSelected] = useState(selectedDate);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setSelected(new Date(selectedDate));
      setCurrentMonth(new Date(selectedDate));
    }
  }, [selectedDate]);

  // Generate days of week based on startOfWeek
  const daysOfWeek = useMemo(() => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return [...days.slice(startOfWeek), ...days.slice(0, startOfWeek)];
  }, [startOfWeek]);

  // Navigation functions
  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
    onMonthChange(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
    onMonthChange(newMonth);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelected(today);
    onDateSelect(today);
    onMonthChange(today);
    fetchAppointmentsForDate(today);
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Check if date is disabled
  const isDateDisabled = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    
    return disabledDates.some(d => 
      new Date(d).toISOString().split('T')[0] === dateStr
    );
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Check if date is selected
  const isSelected = (date) => {
    if (!selected) return false;
    return date.getDate() === selected.getDate() &&
           date.getMonth() === selected.getMonth() &&
           date.getFullYear() === selected.getFullYear();
  };

  // Generate calendar grid
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    
    // Adjust for start of week
    let firstDayIndex = firstDay.getDay() - startOfWeek;
    if (firstDayIndex < 0) firstDayIndex += 7;
    
    const daysInMonth = getDaysInMonth(currentMonth);
    const days = [];

    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDayIndex; i++) {
      const day = prevMonthDays - firstDayIndex + i + 1;
      const date = new Date(year, month - 1, day);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: isSelected(date),
        isDisabled: isDateDisabled(date)
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday: isToday(date),
        isSelected: isSelected(date),
        isDisabled: isDateDisabled(date)
      });
    }

    // Next month days
    const totalCells = 42; // 6 weeks
    const nextMonthDays = totalCells - days.length;
    for (let day = 1; day <= nextMonthDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: isSelected(date),
        isDisabled: isDateDisabled(date)
      });
    }

    return days;
  };

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;
    setSelected(date);
    onDateSelect(date);
    fetchAppointmentsForDate(date);
  };

  const handleAppointmentClick = (appt) => {
    setSelectedAppointment(appt);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedAppointment(null);
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const days = generateCalendarDays();

  const fetchAppointmentsForDate = async (date) => {
    try {
      const res = await api.get('/appointements/date', { 
        params: { date: date.toISOString() } 
      });
      setAppointments(res.data);
      // Clear selected appointment when date changes
      setSelectedAppointment(null);
    } catch(err) {
      console.error('Error fetching appointments:', err);
    }
  }

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-600',
          borderLeft: 'border-l-green-400'
        };
      case 'Cancelled':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-600',
          borderLeft: 'border-l-red-400'
        };
      default:
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-600',
          borderLeft: 'border-l-yellow-400'
        };
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-semibold text-gray-800">
            {formatMonthYear(currentMonth)}
          </h2>
          
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={goToToday}
          className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-colors"
        >
          Today
        </button>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {showWeekNumbers && (
          <div className="text-center text-sm font-medium text-gray-500 py-2">
            Wk
          </div>
        )}
        
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dayData, index) => (
          <React.Fragment key={index}>
            {showWeekNumbers && index % 7 === 0 && (
              <div className="flex items-center justify-center text-sm text-gray-400">
                {Math.floor(index / 7) + 1}
              </div>
            )}
            
            <button
              onClick={() => handleDateClick(dayData.date)}
              disabled={dayData.isDisabled}
              className={`
                relative h-12 rounded-lg flex items-center justify-center
                transition-all duration-200
                ${dayData.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
                ${dayData.isSelected 
                  ? 'bg-blue-500 text-white font-semibold' 
                  : 'hover:bg-gray-100'
                }
                ${dayData.isDisabled 
                  ? 'cursor-not-allowed text-gray-300 hover:bg-transparent' 
                  : 'cursor-pointer'
                }
                ${dayData.isToday && !dayData.isSelected 
                  ? 'border-2 border-blue-500' 
                  : ''
                }
                ${dayData.isToday && dayData.isSelected 
                  ? 'ring-2 ring-blue-300' 
                  : ''
                }
              `}
            >
              <span>{dayData.day}</span>
              
              {/* Today indicator */}
              {highlightToday && dayData.isToday && !dayData.isSelected && (
                <span className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full"></span>
              )}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Selected date display */}
      {selected && (
        <div className="max-h-100 mt-6 pt-6 border-t border-gray-200 overflow-y-auto">
          <div className="flex items-center space-x-3 text-gray-600">
            <CalendarIcon className="w-5 h-5" />
            <span className="font-medium">
              Selected: {selected.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Activities & Appointments</h3>
            <div className="space-y-2">
              {appointments.length === 0 ? (
                <p className="text-gray-500 text-sm">No appointments for this date.</p>
              ) : (
                appointments.map((appt) => {
                  const statusColor = getStatusColor(appt.status);
                  
                  return (
                    <div
                      key={appt._id}
                      className={`p-3 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer ${statusColor.bg} ${statusColor.border}`}
                      onClick={() => handleAppointmentClick(appt)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{appt.user.username.toUpperCase()}</h3>
                          <h4 className="font-medium text-gray-800">{appt.service.title}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {new Date(appt.dateTime).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          <p className={`text-sm font-medium ${statusColor.text}`}>
                            {appt.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Modal - Shows only the clicked appointment */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Appointment Details
              </h3>
              <button
                onClick={closeDetails}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Header with date and time */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-1">
                  {selected && selected.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h4>
                <div className="flex items-center text-blue-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-medium">
                    {new Date(selectedAppointment.dateTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>
              </div>

              {/* Appointment Information */}
              <div className="space-y-4">
                {/* Client Information */}
                <div className="flex items-start">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Client</h4>
                    <p className="font-semibold text-gray-800">{selectedAppointment.user.username.toUpperCase()}</p>
                    {selectedAppointment.user.email && (
                      <p className="text-sm text-gray-600 mt-1">{selectedAppointment.user.email}</p>
                    )}
                  </div>
                </div>

                {/* Service Information */}
                <div className="flex items-start">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    <Package className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Service</h4>
                    <p className="font-semibold text-gray-800">{selectedAppointment.service.title}</p>
                    {selectedAppointment.service.description && (
                      <p className="text-sm text-gray-600 mt-1">{selectedAppointment.service.description}</p>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    <Info className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedAppointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' : selectedAppointment.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>

                {/* Additional Details */}
                {selectedAppointment.requestDescription && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Additional Notes</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedAppointment.requestDescription}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={closeDetails}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;