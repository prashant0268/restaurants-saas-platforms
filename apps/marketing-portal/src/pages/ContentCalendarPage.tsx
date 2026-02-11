import { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { StatusBadge } from '../components/shared/StatusBadge';

interface CalendarEvent {
  id: string;
  title: string;
  channel: string;
  date: string;
  time: string;
  status: 'scheduled' | 'active' | 'draft' | 'completed';
}

const mockEvents: CalendarEvent[] = [
  { id: '1', title: 'Weekend Brunch Email', channel: 'Email', date: '2026-02-09', time: '09:00', status: 'active' },
  { id: '2', title: 'Valentine\'s Push', channel: 'Push', date: '2026-02-14', time: '08:00', status: 'scheduled' },
  { id: '3', title: 'Loyalty Points SMS', channel: 'SMS', date: '2026-02-10', time: '12:00', status: 'scheduled' },
  { id: '4', title: 'New Menu Teaser', channel: 'Email', date: '2026-02-12', time: '10:00', status: 'draft' },
  { id: '5', title: 'Presidents Day Special', channel: 'Push', date: '2026-02-17', time: '07:00', status: 'scheduled' },
  { id: '6', title: 'Happy Hour Reminder', channel: 'In-App', date: '2026-02-11', time: '15:00', status: 'scheduled' },
  { id: '7', title: 'Spring Menu Launch', channel: 'Email', date: '2026-03-01', time: '09:00', status: 'draft' },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const ContentCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDay = (day: number): CalendarEvent[] => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockEvents.filter((e) => e.date === dateStr);
  };

  const calendarDays: Array<number | null> = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  return (
    <PageContainer
      title="Content Calendar"
      subtitle="View and manage scheduled campaigns"
    >
      {/* Calendar Navigation */}
      <div style={styles.calendarHeader}>
        <button style={styles.navButton} onClick={prevMonth}>
          &larr; Previous
        </button>
        <h2 style={styles.monthTitle}>
          {monthNames[month]} {year}
        </h2>
        <button style={styles.navButton} onClick={nextMonth}>
          Next &rarr;
        </button>
      </div>

      {/* Calendar Grid */}
      <div style={styles.calendarGrid}>
        {/* Day Headers */}
        {daysOfWeek.map((day) => (
          <div key={day} style={styles.dayHeader}>
            {day}
          </div>
        ))}

        {/* Calendar Cells */}
        {calendarDays.map((day, idx) => {
          const events = day ? getEventsForDay(day) : [];
          const isToday = day === 9 && month === 1 && year === 2026;

          return (
            <div
              key={idx}
              style={{
                ...styles.dayCell,
                ...(day === null ? styles.emptyCell : {}),
                ...(isToday ? styles.todayCell : {}),
              }}
            >
              {day !== null && (
                <>
                  <span
                    style={{
                      ...styles.dayNumber,
                      ...(isToday ? styles.todayNumber : {}),
                    }}
                  >
                    {day}
                  </span>
                  <div style={styles.eventsList}>
                    {events.map((event) => (
                      <div key={event.id} style={styles.eventItem}>
                        <span style={styles.eventTime}>{event.time}</span>
                        <span style={styles.eventTitle}>{event.title}</span>
                        <StatusBadge status={event.status} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Upcoming Events List */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Upcoming Scheduled</h3>
        <div style={styles.upcomingList}>
          {mockEvents
            .filter((e) => e.status === 'scheduled')
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((event) => (
              <div key={event.id} style={styles.upcomingItem}>
                <div style={styles.upcomingDate}>
                  <span style={styles.upcomingDay}>
                    {new Date(event.date + 'T00:00').getDate()}
                  </span>
                  <span style={styles.upcomingMonth}>
                    {monthNames[new Date(event.date + 'T00:00').getMonth()].slice(0, 3)}
                  </span>
                </div>
                <div style={styles.upcomingDetails}>
                  <strong>{event.title}</strong>
                  <span style={styles.upcomingMeta}>
                    {event.channel} - {event.time}
                  </span>
                </div>
                <StatusBadge status={event.status} />
              </div>
            ))}
        </div>
      </div>
    </PageContainer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    color: '#2d3748',
  },
  navButton: {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    color: '#4a5568',
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 1,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 32,
  },
  dayHeader: {
    padding: '10px 8px',
    backgroundColor: '#f7fafc',
    textAlign: 'center' as const,
    fontSize: 12,
    fontWeight: 600,
    color: '#718096',
    textTransform: 'uppercase' as const,
  },
  dayCell: {
    minHeight: 100,
    padding: 8,
    backgroundColor: '#ffffff',
    verticalAlign: 'top',
  },
  emptyCell: {
    backgroundColor: '#f7fafc',
  },
  todayCell: {
    backgroundColor: '#f5f3ff',
  },
  dayNumber: {
    display: 'inline-block',
    fontSize: 13,
    fontWeight: 500,
    color: '#4a5568',
    marginBottom: 4,
  },
  todayNumber: {
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  eventItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: 4,
    backgroundColor: '#f7fafc',
    borderRadius: 4,
    borderLeft: '3px solid #6c63ff',
  },
  eventTime: {
    fontSize: 10,
    color: '#a0aec0',
  },
  eventTitle: {
    fontSize: 11,
    fontWeight: 500,
    color: '#2d3748',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    margin: '0 0 12px',
    fontSize: 18,
    fontWeight: 600,
    color: '#2d3748',
  },
  upcomingList: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    padding: 16,
  },
  upcomingItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '12px 0',
    borderBottom: '1px solid #edf2f7',
  },
  upcomingDate: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 48,
    padding: 8,
    backgroundColor: '#f7fafc',
    borderRadius: 6,
  },
  upcomingDay: {
    fontSize: 20,
    fontWeight: 700,
    color: '#2d3748',
  },
  upcomingMonth: {
    fontSize: 11,
    color: '#a0aec0',
    textTransform: 'uppercase' as const,
  },
  upcomingDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  upcomingMeta: {
    fontSize: 12,
    color: '#718096',
  },
};
