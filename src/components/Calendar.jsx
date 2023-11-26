import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // If you're using default styling

// Your custom styles
import "../components/Calendar.css";

const EventsCalendar = ({ events, onDateSelect }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
    const eventForDate = events.find(
      (event) =>
        new Date(event.eventDate).toDateString() === newDate.toDateString()
    );
    if (eventForDate) {
      onDateSelect(eventForDate);
    }
  };

  const dateHasEvents = (date) => {
    return events.some(
      (event) =>
        new Date(event.eventDate).toDateString() === date.toDateString()
    );
  };

  const isToday = (date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const renderTileContent = ({ date, view }) => {
    // Only modify the content for the month view
    if (view === "month") {
      return (
        <div style={{ position: "relative" }}>
          {dateHasEvents(date) && <div className="event-indicator" />}
          {isToday(date) && <div className="today-indicator" />}
        </div>
      );
    }
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        tileContent={renderTileContent}
      />
    </div>
  );
};

export default EventsCalendar;
