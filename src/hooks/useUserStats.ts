import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserScores {
  total_points: number;
  problems_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  current_streak: number;
  longest_streak: number;
  quizzes_completed: number;
  quiz_total_score: number;
  last_activity_date: string | null;
}

interface Badge {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  earned_at?: string;
}

interface ActivityItem {
  id: string;
  activity_type: string;
  title: string;
  description: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

interface DailyActivity {
  date: string;
  count: number;
}

interface TopicProgress {
  topic: string;
  count: number;
}

interface RankingData {
  global_rank: number;
  total_users: number;
  percentile: number;
}

export const useUserStats = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState<UserScores | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [heatmapData, setHeatmapData] = useState<DailyActivity[]>([]);
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [ranking, setRanking] = useState<RankingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAllData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchAllData = async () => {
    if (!user) return;
    setLoading(true);
    
    await Promise.all([
      fetchScores(),
      fetchBadges(),
      fetchActivities(),
      fetchHeatmapData(),
      fetchTopicProgress(),
      fetchRanking(),
    ]);
    
    setLoading(false);
  };

  const fetchScores = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('user_scores')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (data) {
      setScores(data as UserScores);
    }
  };

  const fetchBadges = async () => {
    if (!user) return;

    // Fetch all badges
    const { data: allBadgesData } = await supabase
      .from('badges')
      .select('*');
    
    if (allBadgesData) {
      setAllBadges(allBadgesData as Badge[]);
    }

    // Fetch user's earned badges
    const { data: userBadges } = await supabase
      .from('user_badges')
      .select(`
        earned_at,
        badges (
          id,
          key,
          name,
          description,
          icon
        )
      `)
      .eq('user_id', user.id);

    if (userBadges) {
      const earnedBadges = userBadges.map((ub: { earned_at: string; badges: Badge }) => ({
        ...ub.badges,
        earned_at: ub.earned_at,
      }));
      setBadges(earnedBadges);
    }
  };

  const fetchActivities = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('activity_feed')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) {
      setActivities(data as ActivityItem[]);
    }
  };

  const fetchHeatmapData = async () => {
    if (!user) return;

    // Get problem solves grouped by date for last year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const { data } = await supabase
      .from('problem_solve_history')
      .select('solved_at')
      .eq('user_id', user.id)
      .gte('solved_at', oneYearAgo.toISOString());

    if (data) {
      const countByDate: Record<string, number> = {};
      data.forEach((item: { solved_at: string }) => {
        const date = item.solved_at.split('T')[0];
        countByDate[date] = (countByDate[date] || 0) + 1;
      });

      const heatmap = Object.entries(countByDate).map(([date, count]) => ({
        date,
        count,
      }));
      setHeatmapData(heatmap);
    }
  };

  const fetchTopicProgress = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('problem_solve_history')
      .select('topic')
      .eq('user_id', user.id);

    if (data) {
      const countByTopic: Record<string, number> = {};
      data.forEach((item: { topic: string }) => {
        countByTopic[item.topic] = (countByTopic[item.topic] || 0) + 1;
      });

      const progress = Object.entries(countByTopic)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count);
      setTopicProgress(progress);
    }
  };

  const fetchRanking = async () => {
    if (!user) return;

    // Get total users count
    const { count: totalUsers } = await supabase
      .from('user_scores')
      .select('*', { count: 'exact', head: true });

    // Get user's rank by points
    const { data: userScore } = await supabase
      .from('user_scores')
      .select('total_points')
      .eq('user_id', user.id)
      .single();

    if (userScore && totalUsers) {
      const { count: usersAbove } = await supabase
        .from('user_scores')
        .select('*', { count: 'exact', head: true })
        .gt('total_points', userScore.total_points);

      const rank = (usersAbove || 0) + 1;
      const percentile = Math.round((1 - rank / totalUsers) * 100);

      setRanking({
        global_rank: rank,
        total_users: totalUsers,
        percentile: Math.max(0, percentile),
      });
    }
  };

  const quizStats = useMemo(() => {
    if (!scores || scores.quizzes_completed === 0) {
      return { average: 0, highest: 0 };
    }
    return {
      average: Math.round(scores.quiz_total_score / scores.quizzes_completed),
      highest: 0, // Would need separate query for this
    };
  }, [scores]);

  return {
    scores,
    badges,
    allBadges,
    activities,
    heatmapData,
    topicProgress,
    ranking,
    quizStats,
    loading,
    refresh: fetchAllData,
  };
};
