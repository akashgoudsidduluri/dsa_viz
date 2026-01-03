import { motion } from 'framer-motion';
import { Target, Flame, Zap, Trophy, TrendingUp } from 'lucide-react';

interface UserScores {
  total_points: number;
  problems_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  current_streak: number;
  longest_streak: number;
}

interface StatsOverviewProps {
  scores: UserScores | null;
}

export const StatsOverview = ({ scores }: StatsOverviewProps) => {
  const stats = [
    {
      label: 'Problems Solved',
      value: scores?.problems_solved || 0,
      icon: Target,
      gradient: 'from-primary/20 to-primary/5',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      label: 'Current Streak',
      value: scores?.current_streak || 0,
      suffix: 'd',
      icon: Flame,
      gradient: 'from-warning/20 to-warning/5',
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
    {
      label: 'Total Points',
      value: scores?.total_points || 0,
      icon: Trophy,
      gradient: 'from-accent/20 to-accent/5',
      iconBg: 'bg-accent/10',
      iconColor: 'text-accent',
    },
    {
      label: 'Best Streak',
      value: scores?.longest_streak || 0,
      suffix: 'd',
      icon: Zap,
      gradient: 'from-info/20 to-info/5',
      iconBg: 'bg-info/10',
      iconColor: 'text-info',
    },
  ];

  const totalProblems = (scores?.easy_solved || 0) + (scores?.medium_solved || 0) + (scores?.hard_solved || 0);
  const easyPercent = totalProblems > 0 ? ((scores?.easy_solved || 0) / totalProblems) * 100 : 33;
  const mediumPercent = totalProblems > 0 ? ((scores?.medium_solved || 0) / totalProblems) * 100 : 33;
  const hardPercent = totalProblems > 0 ? ((scores?.hard_solved || 0) / totalProblems) * 100 : 34;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-4"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className={`rounded-xl border border-border bg-gradient-to-br ${stat.gradient} p-4`}
          >
            <div className={`w-9 h-9 rounded-lg ${stat.iconBg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4.5 h-4.5 ${stat.iconColor}`} />
            </div>
            <p className="text-2xl font-bold tracking-tight">
              {stat.value.toLocaleString()}
              {stat.suffix && <span className="text-sm font-medium text-muted-foreground">{stat.suffix}</span>}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Difficulty Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            Difficulty Breakdown
          </h3>
          <span className="text-xs text-muted-foreground">{totalProblems} total</span>
        </div>
        
        {/* Stacked Progress Bar */}
        <div className="h-3 bg-muted rounded-full overflow-hidden flex mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${easyPercent}%` }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-success h-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${mediumPercent}%` }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-warning h-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${hardPercent}%` }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-destructive h-full"
          />
        </div>
        
        {/* Legend */}
        <div className="flex justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-muted-foreground">Easy</span>
            <span className="font-semibold">{scores?.easy_solved || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="text-muted-foreground">Medium</span>
            <span className="font-semibold">{scores?.medium_solved || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Hard</span>
            <span className="font-semibold">{scores?.hard_solved || 0}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
