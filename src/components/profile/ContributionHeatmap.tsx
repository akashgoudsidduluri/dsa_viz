import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface DailyActivity {
  date: string;
  count: number;
}

interface ContributionHeatmapProps {
  data: DailyActivity[];
}

export const ContributionHeatmap = ({ data }: ContributionHeatmapProps) => {
  const { weeks, months, maxCount } = useMemo(() => {
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    // Create a map of date -> count
    const countMap = new Map<string, number>();
    data.forEach(item => {
      countMap.set(item.date, item.count);
    });

    // Generate weeks
    const weeks: { date: Date; count: number }[][] = [];
    let currentWeek: { date: Date; count: number }[] = [];
    const currentDate = new Date(oneYearAgo);
    
    // Start from Sunday
    while (currentDate.getDay() !== 0) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    let maxCount = 0;
    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = countMap.get(dateStr) || 0;
      maxCount = Math.max(maxCount, count);
      
      currentWeek.push({
        date: new Date(currentDate),
        count,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    // Generate month labels
    const months: { label: string; week: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const month = week[0].date.getMonth();
      if (month !== lastMonth) {
        months.push({
          label: week[0].date.toLocaleDateString('en-US', { month: 'short' }),
          week: weekIndex,
        });
        lastMonth = month;
      }
    });

    return { weeks, months, maxCount };
  }, [data]);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-muted';
    if (maxCount === 0) return 'bg-muted';
    
    const intensity = count / maxCount;
    if (intensity <= 0.25) return 'bg-primary/25';
    if (intensity <= 0.5) return 'bg-primary/50';
    if (intensity <= 0.75) return 'bg-primary/75';
    return 'bg-primary';
  };

  const totalContributions = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Activity Heatmap</h3>
        <span className="text-sm text-muted-foreground">
          {totalContributions >= 60 
            ? `${Math.round(totalContributions / 60)}h ${totalContributions % 60}m` 
            : `${totalContributions}m`} time spent in the last year
        </span>
      </div>

      {/* Month Labels */}
      <div className="flex gap-1 text-xs text-muted-foreground pl-8">
        {months.map((month, i) => (
          <div
            key={i}
            style={{ 
              marginLeft: i === 0 ? 0 : `${(month.week - (months[i - 1]?.week || 0) - 1) * 12}px`,
            }}
          >
            {month.label}
          </div>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div className="flex gap-1">
        {/* Day Labels */}
        <div className="flex flex-col gap-1 text-xs text-muted-foreground pr-2">
          <span className="h-3" />
          <span className="h-3">Mon</span>
          <span className="h-3" />
          <span className="h-3">Wed</span>
          <span className="h-3" />
          <span className="h-3">Fri</span>
          <span className="h-3" />
        </div>

        {/* Weeks */}
        <div className="flex gap-1 overflow-x-auto">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-colors hover:ring-2 hover:ring-primary/50`}
                  title={`${day.date.toLocaleDateString()}: ${day.count >= 60 ? `${Math.floor(day.count / 60)}h ${day.count % 60}m` : `${day.count}m`}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-muted" />
          <div className="w-3 h-3 rounded-sm bg-primary/25" />
          <div className="w-3 h-3 rounded-sm bg-primary/50" />
          <div className="w-3 h-3 rounded-sm bg-primary/75" />
          <div className="w-3 h-3 rounded-sm bg-primary" />
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
};
