import { motion } from 'framer-motion';
import { Target, Flame, Zap, Trophy } from 'lucide-react';

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
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Current Streak',
      value: scores?.current_streak || 0,
      suffix: ' days',
      icon: Flame,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      label: 'Total Points',
      value: scores?.total_points || 0,
      icon: Trophy,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      label: 'Longest Streak',
      value: scores?.longest_streak || 0,
      suffix: ' days',
      icon: Zap,
      color: 'text-info',
      bg: 'bg-info/10',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + index * 0.05 }}
          className="glass-card p-4 space-y-2"
        >
          <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {stat.value.toLocaleString()}
              {stat.suffix && <span className="text-sm font-normal text-muted-foreground">{stat.suffix}</span>}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </motion.div>
      ))}

      {/* Difficulty Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="col-span-2 md:col-span-4 glass-card p-4"
      >
        <h3 className="text-sm font-medium mb-3">Problems by Difficulty</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm">Easy: <strong>{scores?.easy_solved || 0}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-sm">Medium: <strong>{scores?.medium_solved || 0}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-sm">Hard: <strong>{scores?.hard_solved || 0}</strong></span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
