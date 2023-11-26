import React from "react";

const EventModal = ({ event, onClose }) => {
  const eventsArray = Array.isArray(event) ? event : [event];
  return (
    <div className="eventModal">
      <h2>Events</h2>
      {eventsArray.length === 0 ? (
        <p>No events on this day.</p>
      ) : (
        eventsArray.map((event) => (
          <div key={event.id}>
            <h3>{event.eventName}</h3>
            <p>Date: {event.eventDate}</p>
            <p>Cost: {event.eventCost}</p>
          </div>
        ))
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventModal;
