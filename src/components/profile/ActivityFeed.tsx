import { motion } from 'framer-motion';
import { Target, Award, Flame, FileText } from 'lucide-react';

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

const colorMap: Record<string, string> = {
  problem_solved: 'bg-primary/10 text-primary',
  quiz_completed: 'bg-info/10 text-info',
  badge_earned: 'bg-accent/10 text-accent',
  streak_update: 'bg-warning/10 text-warning',
};

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
  };

  if (activities.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">No activity yet. Start solving problems!</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 space-y-4">
      <h3 className="font-medium">Recent Activity</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => {
          const IconComponent = iconMap[activity.activity_type] || Target;
          const colorClass = colorMap[activity.activity_type] || 'bg-muted text-muted-foreground';

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0`}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{activity.title}</p>
                {activity.description && (
                  <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                )}
              </div>
              
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatTime(activity.created_at)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
