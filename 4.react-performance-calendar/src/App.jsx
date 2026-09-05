import React, { memo, useCallback, useMemo, useState } from "react";
import "./styles.css";

// ============================================================
// INITIAL EVENTS
// ============================================================

const initialEvents = [
  {
    id: 1,
    title: "React Lecture",
    day: 3,
  },
  {
    id: 2,
    title: "DSA Practice",
    day: 8,
  },
  {
    id: 3,
    title: "Project Meeting",
    day: 15,
  },
  {
    id: 4,
    title: "AI/ML Assignment",
    day: 22,
  },
];

// ============================================================
// CALENDAR DAY
// ============================================================

const CalendarDay = memo(function CalendarDay({
  day,
  events,
  onDropEvent,
}) {
  console.log(`📅 CalendarDay ${day} rendered`);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragStart = useCallback((e, eventId) => {
    e.dataTransfer.setData(
      "text/plain",
      String(eventId)
    );

    e.dataTransfer.effectAllowed = "move";

    console.log("Dragging event:", eventId);
  }, []);

  return (
    <div
      className="calendar-day"
      onDragOver={handleDragOver}
      onDrop={(e) => {
        e.preventDefault();

        const eventId = e.dataTransfer.getData(
          "text/plain"
        );

        if (eventId) {
          onDropEvent(Number(eventId), day);
        }
      }}
    >
      {/* FIX: strong tag required by the test */}
      <strong className="day-number">
        {day}
      </strong>

      {events.map((event) => (
        <div
          key={event.id}
          className="calendar-event"
          draggable="true"
          onDragStart={(e) =>
            handleDragStart(e, event.id)
          }
        >
          {event.title}
        </div>
      ))}
    </div>
  );
});

// ============================================================
// CALENDAR
// ============================================================

function Calendar({
  events,
  onMoveEvent,
}) {
  /*
    useMemo:
    Creates the calendar structure only once.
  */

  const days = useMemo(() => {
    console.log("📅 Creating calendar days");

    // September 1, 2026 = Tuesday
    const startingDay = 2;

    const emptyDays = Array(
      startingDay
    ).fill(null);

    const calendarDays = Array.from(
      { length: 30 },
      (_, index) => index + 1
    );

    return [
      ...emptyDays,
      ...calendarDays,
    ];
  }, []);

  /*
    useCallback:
    Keeps the same function reference.
  */

  const handleDropEvent = useCallback(
    (eventId, newDay) => {
      console.log(
        `Moving event ${eventId} to day ${newDay}`
      );

      onMoveEvent(
        eventId,
        newDay
      );
    },
    [onMoveEvent]
  );

  return (
    <section className="demo calendar-section">

      <h2>📅 Interactive Calendar</h2>

      <p>
        Drag an event from one date and drop it
        onto another date.
      </p>

      <div className="calendar-header">
        September 2026
      </div>

      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="calendar-grid">

        {days.map((day, index) =>

          day === null ? (

            <div
              key={`empty-${index}`}
              className="calendar-day empty-day"
            />

          ) : (

            <CalendarDay
              key={day}
              day={day}
              events={events.filter(
                (event) =>
                  event.day === day
              )}
              onDropEvent={
                handleDropEvent
              }
            />

          )
        )}

      </div>
    </section>
  );
}

// ============================================================
// OPTIMIZED CHILD
// ============================================================

const OptimizedChild = memo(
  function OptimizedChild({
    onClick,
    value,
  }) {
    console.log(
      "✅ OptimizedChild rendered"
    );

    return (
      <div className="child-card">

        <h3>
          Optimized Child
        </h3>

        <p>
          Value: {value}
        </p>

        <button onClick={onClick}>
          Child Button
        </button>

      </div>
    );
  }
);

// ============================================================
// NON-OPTIMIZED CHILD
// ============================================================

function NonOptimizedChild({
  value,
}) {
  console.log(
    "❌ NonOptimizedChild rendered"
  );

  let result = 0;

  for (
    let i = 0;
    i < 5000000;
    i++
  ) {
    result += i;
  }

  return (
    <div className="child-card">

      <h3>
        Non-Optimized Child
      </h3>

      <p>
        Value: {value}
      </p>

      <p>
        Expensive calculation:{" "}
        {result + value}
      </p>

    </div>
  );
}

// ============================================================
// PERFORMANCE DEMO
// ============================================================

function PerformanceDemo() {
  const [count, setCount] =
    useState(0);

  const [text, setText] =
    useState("");

  const [optimized, setOptimized] =
    useState(true);

  /*
    useMemo:
    Expensive calculation only runs
    when count changes.
  */

  const expensiveCalculation =
    useMemo(() => {

      console.log(
        "⚡ Expensive calculation running"
      );

      let result = 0;

      for (
        let i = 0;
        i < 5000000;
        i++
      ) {
        result += i;
      }

      return result + count;

    }, [count]);

  /*
    useCallback:
    Keeps function reference stable.
  */

  const handleChildClick =
    useCallback(() => {

      console.log(
        "Optimized child clicked"
      );

    }, []);

  return (
    <section className="demo optimized">

      <h2>
        ⚡ React Performance Optimization
      </h2>

      <p>
        Compare optimized and non-optimized
        React rendering using the browser console.
      </p>

      <div className="performance-buttons">

        <button
          className={
            optimized
              ? "active-button"
              : ""
          }
          onClick={() =>
            setOptimized(true)
          }
        >
          Optimized
        </button>

        <button
          className={
            !optimized
              ? "active-button"
              : ""
          }
          onClick={() =>
            setOptimized(false)
          }
        >
          Non-Optimized
        </button>

      </div>

      <div className="controls">

        <button
          onClick={() =>
            setCount(count + 1)
          }
        >
          Count: {count}
        </button>

        <input
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Type something..."
        />

      </div>

      {optimized ? (

        <>

          <p>
            <strong>
              Mode:
            </strong>{" "}
            Optimized
          </p>

          <p>
            <strong>
              Expensive Result:
            </strong>{" "}
            {expensiveCalculation}
          </p>

          <OptimizedChild
            onClick={
              handleChildClick
            }
            value={count}
          />

        </>

      ) : (

        <>

          <p>
            <strong>
              Mode:
            </strong>{" "}
            Non-Optimized
          </p>

          <NonOptimizedChild
            value={count}
          />

        </>

      )}

    </section>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {

  const [events, setEvents] =
    useState(initialEvents);

  /*
    useCallback:
    Updates the event's date.
  */

  const handleMoveEvent =
    useCallback(
      (eventId, newDay) => {

        setEvents(
          (currentEvents) =>
            currentEvents.map(
              (event) =>
                event.id === eventId
                  ? {
                      ...event,
                      day: newDay,
                    }
                  : event
            )
        );

      },
      []
    );

  return (
    <main className="container">

      <h1>
        React Interactive Calendar
      </h1>

      <p className="intro">
        Experiment 4: Calendar Optimization
        & Testing
      </p>

      <PerformanceDemo />

      <Calendar
        events={events}
        onMoveEvent={
          handleMoveEvent
        }
      />

      <section className="demo">

        <h2>
          📋 Calendar Events
        </h2>

        {events.map((event) => (

          <div
            className="event-row"
            key={event.id}
          >

            <strong>
              {event.title}
            </strong>

            <span>
              Date: September{" "}
              {event.day}, 2026
            </span>

          </div>

        ))}

      </section>

      <section className="summary">

        <h2>
          Quick Revision
        </h2>

        <ul>

          <li>
            <strong>
              useMemo
            </strong>{" "}
            → memoizes a calculated value.
          </li>

          <li>
            <strong>
              useCallback
            </strong>{" "}
            → memoizes a function reference.
          </li>

          <li>
            <strong>
              React.memo
            </strong>{" "}
            → prevents unnecessary component
            renders when props do not change.
          </li>

          <li>
            <strong>
              Drag & Drop
            </strong>{" "}
            → allows calendar events to be
            moved between dates.
          </li>

          <li>
            <strong>
              React State
            </strong>{" "}
            → stores and updates calendar events.
          </li>

        </ul>

      </section>

    </main>
  );
}