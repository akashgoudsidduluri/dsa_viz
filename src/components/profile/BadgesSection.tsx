import { motion } from 'framer-motion';
import { Trophy, Target, Flame, Star, Zap, Crown, Medal, Gem, Award, Lock } from 'lucide-react';

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
  const earnedCount = badges.length;
  const totalCount = allBadges.length;
  const progressPercent = totalCount > 0 ? (earnedCount / totalCount) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-muted/30 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
              <Award className="w-4 h-4 text-accent" />
            </div>
            <h3 className="font-semibold text-sm">Achievements</h3>
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {earnedCount}/{totalCount}
          </span>
        </div>
        {/* Mini progress bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="p-4">
        <div className="grid grid-cols-5 gap-2">
          {allBadges.map((badge, index) => {
            const isEarned = earnedBadgeIds.has(badge.id);
            const IconComponent = iconMap[badge.icon] || Trophy;

            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.03 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="relative group cursor-pointer"
                title={`${badge.name}: ${badge.description}`}
              >
                <div
                  className={`aspect-square rounded-xl flex items-center justify-center transition-all relative ${
                    isEarned
                      ? 'bg-gradient-to-br from-primary/15 to-accent/15 border-2 border-primary/30 shadow-sm'
                      : 'bg-muted/50 border border-border/50 opacity-50'
                  }`}
                >
                  {isEarned ? (
                    <IconComponent className="w-5 h-5 text-primary" />
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                  
                  {/* Shine effect for earned badges */}
                  {isEarned && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
                    />
                  )}
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  <div className="bg-popover text-popover-foreground text-[11px] rounded-lg px-2.5 py-1.5 shadow-lg border border-border whitespace-nowrap">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-muted-foreground">{badge.description}</p>
                    {!isEarned && <p className="text-warning text-[10px] mt-0.5">🔒 Locked</p>}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-popover" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
