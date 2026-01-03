import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users, Crown } from 'lucide-react';

interface RankingData {
  global_rank: number;
  total_users: number;
  percentile: number;
}

interface UserScores {
  total_points: number;
}

interface RankingCardProps {
  ranking: RankingData | null;
  scores: UserScores | null;
}

export const RankingCard = ({ ranking, scores }: RankingCardProps) => {
  const topPercentage = ranking ? 100 - ranking.percentile : 0;
  const isTopTen = topPercentage <= 10;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-warning/10 flex items-center justify-center">
          <Trophy className="w-4 h-4 text-warning" />
        </div>
        <h3 className="font-semibold text-sm">Leaderboard</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Rank and Points Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative p-3 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            {isTopTen && (
              <Crown className="absolute top-2 right-2 w-4 h-4 text-warning" />
            )}
            <p className="text-2xl font-bold gradient-text">
              #{ranking?.global_rank || '-'}
            </p>
            <p className="text-[11px] text-muted-foreground font-medium mt-0.5">Global Rank</p>
          </div>
          
          <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-2xl font-bold text-accent">
              {scores?.total_points?.toLocaleString() || 0}
            </p>
            <p className="text-[11px] text-muted-foreground font-medium mt-0.5">Total Points</p>
          </div>
        </div>

        {/* Progress Section */}
        {ranking && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Top
              </span>
              <span className="font-bold text-primary">{topPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ranking.percentile}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-primary via-primary/80 to-accent"
              />
            </div>
            <p className="text-[11px] text-muted-foreground text-center">
              Better than <span className="font-semibold text-foreground">{ranking.percentile}%</span> of users
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
          <Users className="w-3.5 h-3.5" />
          <span>{ranking?.total_users?.toLocaleString() || 0} competitors</span>
        </div>
      </div>
    </motion.div>
  );
};
