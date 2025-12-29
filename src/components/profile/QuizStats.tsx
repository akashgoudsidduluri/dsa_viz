import { motion } from 'framer-motion';
import { FileText, Award, TrendingUp } from 'lucide-react';

interface UserScores {
  quizzes_completed: number;
  quiz_total_score: number;
}

interface QuizStatsData {
  average: number;
  highest: number;
}

interface QuizStatsProps {
  scores: UserScores | null;
  quizStats: QuizStatsData;
}

export const QuizStats = ({ scores, quizStats }: QuizStatsProps) => {
  if (!scores || scores.quizzes_completed === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No quizzes taken yet. Try our quiz section!</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 space-y-4">
      <h3 className="font-medium">Quiz Performance</h3>

      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 rounded-lg bg-muted/30"
        >
          <FileText className="w-6 h-6 text-info mx-auto mb-2" />
          <p className="text-2xl font-bold">{scores.quizzes_completed}</p>
          <p className="text-xs text-muted-foreground">Quizzes Taken</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 rounded-lg bg-muted/30"
        >
          <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold">{quizStats.average}%</p>
          <p className="text-xs text-muted-foreground">Avg Score</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 rounded-lg bg-muted/30"
        >
          <Award className="w-6 h-6 text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold">{scores.quiz_total_score}</p>
          <p className="text-xs text-muted-foreground">Total Points</p>
        </motion.div>
      </div>
    </div>
  );
};
