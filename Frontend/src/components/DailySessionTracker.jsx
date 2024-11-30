import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const DailySessionTracker = ({ member }) => {
  const transformAttendanceData = (dates) => {
    return dates.map(date => ({
      date,
      count: 1 // Each date attended equals one session
    }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>

      <h3>Attendance Tracker</h3>
      <CalendarHeatmap
        startDate={new Date(today).setFullYear(new Date().getFullYear() - 1)}
        endDate={new Date(today)}
        values={transformAttendanceData(member.attentanceMatrix)}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
      />
    </div>
  );
};

export default DailySessionTracker;
