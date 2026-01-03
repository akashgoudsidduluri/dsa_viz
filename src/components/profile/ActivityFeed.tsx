import { motion } from 'framer-motion';
import { Target, Award, Flame, FileText, Clock, Activity } from 'lucide-react';

interface ActivityItem {
  id: string;
  activity_type: string;
  title: string;
  description: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  problem_solved: Target,
  quiz_completed: FileText,
  badge_earned: Award,
  streak_update: Flame,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  problem_solved: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
  quiz_completed: { bg: 'bg-info/10', text: 'text-info', border: 'border-info/20' },
  badge_earned: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20' },
  streak_update: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' },
};

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (activities.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
          <Activity className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">No activity yet</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Start solving problems to see your activity here!</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
          <Clock className="w-4 h-4 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-sm">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-border max-h-80 overflow-y-auto">
        {activities.map((activity, index) => {
          const IconComponent = iconMap[activity.activity_type] || Target;
          const colors = colorMap[activity.activity_type] || { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' };

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-start gap-3 p-3 hover:bg-muted/20 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center flex-shrink-0`}>
                <IconComponent className={`w-4 h-4 ${colors.text}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{activity.title}</p>
                {activity.description && (
                  <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                )}
              </div>
              
              <span className="text-[11px] text-muted-foreground flex-shrink-0 pt-0.5">
                {formatTime(activity.created_at)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
