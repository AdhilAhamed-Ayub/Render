import React, { useState, useEffect } from "react";

const CalendarWidget = ({ token }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get calendar data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/events`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    if (token) {
      fetchEvents();
    }
  }, [token]);

  // Get current month's days
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Format date for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Get events for a specific day
  const getEventsForDay = (day) => {
    if (!day) return [];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.toISOString().split("T")[0] === dateStr;
    });
  };

  // Navigation
  const prevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const days = getDaysInMonth(currentDate);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Calendar</h2>
        <a
          href="/EmployeeDashboard/CalendarPage"
          className="text-blue-500 text-sm hover:underline"
        >
          View Full Calendar
        </a>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3 className="font-medium">{formatMonthYear(currentDate)}</h3>
        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {days.map((day, index) => {
              const eventsForDay = day ? getEventsForDay(day) : [];
              const isToday =
                day &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear() &&
                day === new Date().getDate();

              return (
                <div
                  key={index}
                  className={`relative h-10 text-center p-1 text-sm rounded-md ${
                    !day
                      ? "opacity-0"
                      : isToday
                      ? "bg-blue-50 font-bold"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {day}
                  {eventsForDay.length > 0 && (
                    <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Upcoming Events</h4>
            <div className="max-h-36 overflow-y-auto">
              {events.length > 0 ? (
                events.slice(0, 3).map((event) => (
                  <div key={event._id} className="py-1 border-b text-sm">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No upcoming events</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;
