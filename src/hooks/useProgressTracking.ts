import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProblemSolveData {
  problem_id: string;
  problem_title: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface QuizData {
  quiz_topic: string;
  score: number;
  total_questions: number;
  time_taken_seconds?: number;
}

export const useProgressTracking = () => {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();

  const recordProblemSolved = async (data: ProblemSolveData) => {
    if (!user) {
      toast({
        title: 'Not logged in',
        description: 'Please sign in to track your progress.',
        variant: 'destructive',
      });
      return { error: new Error('Not authenticated') };
    }

    // Check if already solved
    const { data: existing } = await supabase
      .from('problem_solve_history')
      .select('id')
      .eq('user_id', user.id)
      .eq('problem_id', data.problem_id)
      .maybeSingle();

    if (existing) {
      return { error: null, alreadySolved: true };
    }

    // Insert solve record
    const { error: solveError } = await supabase
      .from('problem_solve_history')
      .insert({
        user_id: user.id,
        ...data,
      });

    if (solveError) {
      console.error('Error recording solve:', solveError);
      return { error: solveError };
    }

    // Update user scores
    const pointsMap = { Easy: 10, Medium: 25, Hard: 50 };
    const points = pointsMap[data.difficulty];

    const { data: currentScores } = await supabase
      .from('user_scores')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (currentScores) {
      const today = new Date().toISOString().split('T')[0];
      const lastActivity = currentScores.last_activity_date;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      let newStreak = currentScores.current_streak;
      if (lastActivity === yesterday) {
        newStreak += 1;
      } else if (lastActivity !== today) {
        newStreak = 1;
      }

      const updateData: Record<string, number | string> = {
        total_points: currentScores.total_points + points,
        problems_solved: currentScores.problems_solved + 1,
        current_streak: newStreak,
        longest_streak: Math.max(currentScores.longest_streak, newStreak),
        last_activity_date: today,
      };

      if (data.difficulty === 'Easy') {
        updateData.easy_solved = currentScores.easy_solved + 1;
      } else if (data.difficulty === 'Medium') {
        updateData.medium_solved = currentScores.medium_solved + 1;
      } else {
        updateData.hard_solved = currentScores.hard_solved + 1;
      }

      await supabase
        .from('user_scores')
        .update(updateData)
        .eq('user_id', user.id);

      // Add activity
      await supabase.from('activity_feed').insert({
        user_id: user.id,
        activity_type: 'problem_solved',
        title: `Solved: ${data.problem_title}`,
        description: `Completed a ${data.difficulty} problem in ${data.topic}`,
        metadata: { difficulty: data.difficulty, topic: data.topic, points },
      });

      // Check for badges
      await checkAndAwardBadges(user.id, updateData);
    }

    toast({
      title: 'Problem Solved! 🎉',
      description: `You earned ${points} points!`,
    });

    return { error: null, alreadySolved: false };
  };

  const recordQuizCompleted = async (data: QuizData) => {
    if (!user) {
      toast({
        title: 'Not logged in',
        description: 'Please sign in to track your progress.',
        variant: 'destructive',
      });
      return { error: new Error('Not authenticated') };
    }

    // Insert quiz record
    const { error: quizError } = await supabase
      .from('quiz_history')
      .insert({
        user_id: user.id,
        ...data,
      });

    if (quizError) {
      console.error('Error recording quiz:', quizError);
      return { error: quizError };
    }

    // Update user scores
    const { data: currentScores } = await supabase
      .from('user_scores')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (currentScores) {
      await supabase
        .from('user_scores')
        .update({
          quizzes_completed: currentScores.quizzes_completed + 1,
          quiz_total_score: currentScores.quiz_total_score + data.score,
        })
        .eq('user_id', user.id);

      // Add activity
      await supabase.from('activity_feed').insert({
        user_id: user.id,
        activity_type: 'quiz_completed',
        title: `Quiz Completed: ${data.quiz_topic}`,
        description: `Scored ${data.score}/${data.total_questions}`,
        metadata: { score: data.score, total: data.total_questions, topic: data.quiz_topic },
      });

      // Check for quiz ace badge
      if (data.score === data.total_questions) {
        await awardBadge(user.id, 'quiz_ace');
      }
    }

    toast({
      title: 'Quiz Completed! 📝',
      description: `You scored ${data.score}/${data.total_questions}`,
    });

    return { error: null };
  };

  const checkAndAwardBadges = async (userId: string, scores: Record<string, number | string>) => {
    const problemsSolved = Number(scores.problems_solved) || 0;
    const easySolved = Number(scores.easy_solved) || 0;
    const mediumSolved = Number(scores.medium_solved) || 0;
    const hardSolved = Number(scores.hard_solved) || 0;
    const streak = Number(scores.current_streak) || 0;

    // First solve badge
    if (problemsSolved === 1) {
      await awardBadge(userId, 'first_solve');
    }

    // Difficulty badges
    if (easySolved === 10) {
      await awardBadge(userId, 'easy_10');
    }
    if (mediumSolved === 10) {
      await awardBadge(userId, 'medium_10');
    }
    if (hardSolved === 5) {
      await awardBadge(userId, 'hard_5');
    }

    // Streak badges
    if (streak === 7) {
      await awardBadge(userId, 'streak_7');
    }
    if (streak === 30) {
      await awardBadge(userId, 'streak_30');
    }

    // Problem count badges
    if (problemsSolved === 50) {
      await awardBadge(userId, 'problem_50');
    }
    if (problemsSolved === 100) {
      await awardBadge(userId, 'problem_100');
    }
  };

  const awardBadge = async (userId: string, badgeKey: string) => {
    const { data: badge } = await supabase
      .from('badges')
      .select('id, name')
      .eq('key', badgeKey)
      .single();

    if (!badge) return;

    // Check if already has badge
    const { data: existing } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', userId)
      .eq('badge_id', badge.id)
      .maybeSingle();

    if (existing) return;

    // Award badge
    await supabase.from('user_badges').insert({
      user_id: userId,
      badge_id: badge.id,
    });

    // Add activity
    await supabase.from('activity_feed').insert({
      user_id: userId,
      activity_type: 'badge_earned',
      title: `Badge Earned: ${badge.name}`,
      description: `You've unlocked a new badge!`,
      metadata: { badge_key: badgeKey },
    });

    toast({
      title: 'Badge Unlocked! 🏆',
      description: `You earned the "${badge.name}" badge!`,
    });
  };

  return {
    recordProblemSolved,
    recordQuizCompleted,
  };
};
