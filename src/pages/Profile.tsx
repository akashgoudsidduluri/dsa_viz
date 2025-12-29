import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Trophy, 
  Target, 
  Flame, 
  Award, 
  Edit2,
  TrendingUp,
  Zap,
  Star,
  Crown,
  Medal,
  Gem,
  Clock,
  BarChart3,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatsOverview } from '@/components/profile/StatsOverview';
import { ContributionHeatmap } from '@/components/profile/ContributionHeatmap';
import { BadgesSection } from '@/components/profile/BadgesSection';
import { ActivityFeed } from '@/components/profile/ActivityFeed';
import { TopicProgress } from '@/components/profile/TopicProgress';
import { RankingCard } from '@/components/profile/RankingCard';
import { QuizStats } from '@/components/profile/QuizStats';
import { EditProfileDialog } from '@/components/profile/EditProfileDialog';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const {
    scores,
    badges,
    allBadges,
    activities,
    heatmapData,
    topicProgress,
    ranking,
    quizStats,
    loading: statsLoading,
    refresh,
  } = useUserStats();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileHeader 
              profile={profile} 
              onEdit={() => setEditDialogOpen(true)} 
            />
            
            <RankingCard ranking={ranking} scores={scores} />
            
            <BadgesSection badges={badges} allBadges={allBadges} />
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            <StatsOverview scores={scores} />
            
            <ContributionHeatmap data={heatmapData} />

            <Tabs defaultValue="progress" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="progress">Topic Progress</TabsTrigger>
                <TabsTrigger value="quiz">Quiz Stats</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="progress" className="mt-4">
                <TopicProgress data={topicProgress} />
              </TabsContent>
              
              <TabsContent value="quiz" className="mt-4">
                <QuizStats scores={scores} quizStats={quizStats} />
              </TabsContent>
              
              <TabsContent value="activity" className="mt-4">
                <ActivityFeed activities={activities} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <EditProfileDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        onSuccess={refresh}
      />

      <Footer />
    </main>
  );
};

export default Profile;
