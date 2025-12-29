import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

interface TopicProgressData {
  topic: string;
  count: number;
}

interface TopicProgressProps {
  data: TopicProgressData[];
}

export const TopicProgress = ({ data }: TopicProgressProps) => {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  if (data.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No topics practiced yet. Start solving problems!</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 space-y-4">
      <h3 className="font-medium">Problems by Topic</h3>
      
      <div className="space-y-3">
        {data.slice(0, 10).map((item, index) => (
          <motion.div
            key={item.topic}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="truncate">{item.topic}</span>
              <span className="text-muted-foreground font-mono">{item.count}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.count / maxCount) * 100}%` }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-info rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
