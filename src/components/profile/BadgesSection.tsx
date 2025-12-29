import { motion } from 'framer-motion';
import { Trophy, Target, Flame, Star, Zap, Crown, Medal, Gem, Award } from 'lucide-react';

interface Badge {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  earned_at?: string;
}

interface BadgesSectionProps {
  badges: Badge[];
  allBadges: Badge[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy,
  target: Target,
  flame: Flame,
  fire: Flame,
  star: Star,
  zap: Zap,
  crown: Crown,
  medal: Medal,
  gem: Gem,
  award: Award,
};

export const BadgesSection = ({ badges, allBadges }: BadgesSectionProps) => {
  const earnedBadgeIds = new Set(badges.map(b => b.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Badges</h3>
        <span className="text-sm text-muted-foreground">
          {badges.length}/{allBadges.length} earned
        </span>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {allBadges.map((badge) => {
          const isEarned = earnedBadgeIds.has(badge.id);
          const IconComponent = iconMap[badge.icon] || Trophy;

          return (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.1 }}
              className={`relative group cursor-pointer`}
              title={`${badge.name}: ${badge.description}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isEarned
                    ? 'bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30'
                    : 'bg-muted/50 border-2 border-border/50 opacity-40 grayscale'
                }`}
              >
                <IconComponent className={`w-6 h-6 ${isEarned ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-popover text-popover-foreground text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                  <p className="font-medium">{badge.name}</p>
                  <p className="text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
