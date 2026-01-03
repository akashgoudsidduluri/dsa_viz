import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users } from 'lucide-react';

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-4 space-y-4"
    >
      <h3 className="font-medium flex items-center gap-2">
        <Trophy className="w-4 h-4 text-warning" />
        Ranking
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 rounded-lg bg-muted/30">
          <p className="text-2xl font-bold gradient-text">
            #{ranking?.global_rank || '-'}
          </p>
          <p className="text-xs text-muted-foreground">Global Rank</p>
        </div>
        
        <div className="text-center p-3 rounded-lg bg-muted/30">
          <p className="text-2xl font-bold text-primary">
            {scores?.total_points?.toLocaleString() || 0}
          </p>
          <p className="text-xs text-muted-foreground">Total Points</p>
        </div>
      </div>

      {ranking && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Top</span>
            <span className="font-medium">{100 - ranking.percentile}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${ranking.percentile}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Better than {ranking.percentile}% of users
          </p>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
        <Users className="w-4 h-4" />
        <span>{ranking?.total_users || 0} total users</span>
      </div>
    </motion.div>
  );
};
