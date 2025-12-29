-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  avatar_key TEXT DEFAULT 'superhero-1',
  bio TEXT,
  date_of_birth DATE,
  phone TEXT,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create problem solve history table
CREATE TABLE public.problem_solve_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  problem_id TEXT NOT NULL,
  problem_title TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  solved_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create quiz history table
CREATE TABLE public.quiz_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quiz_topic TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken_seconds INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create badges table (predefined badges)
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user badges junction table
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, badge_id)
);

-- Create user scores table for ranking
CREATE TABLE public.user_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  total_points INTEGER DEFAULT 0 NOT NULL,
  problems_solved INTEGER DEFAULT 0 NOT NULL,
  easy_solved INTEGER DEFAULT 0 NOT NULL,
  medium_solved INTEGER DEFAULT 0 NOT NULL,
  hard_solved INTEGER DEFAULT 0 NOT NULL,
  current_streak INTEGER DEFAULT 0 NOT NULL,
  longest_streak INTEGER DEFAULT 0 NOT NULL,
  last_activity_date DATE,
  quizzes_completed INTEGER DEFAULT 0 NOT NULL,
  quiz_total_score INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create activity feed table
CREATE TABLE public.activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('problem_solved', 'quiz_completed', 'badge_earned', 'streak_update')),
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_solve_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public profiles are viewable" ON public.profiles FOR SELECT USING (true);

-- Problem solve history policies
CREATE POLICY "Users can view their own solve history" ON public.problem_solve_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own solve history" ON public.problem_solve_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Quiz history policies
CREATE POLICY "Users can view their own quiz history" ON public.quiz_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own quiz history" ON public.quiz_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Badges policies (public read)
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);

-- User badges policies
CREATE POLICY "Users can view their own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public can view user badges" ON public.user_badges FOR SELECT USING (true);

-- User scores policies
CREATE POLICY "Users can view their own scores" ON public.user_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own scores" ON public.user_scores FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own scores" ON public.user_scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public can view scores for ranking" ON public.user_scores FOR SELECT USING (true);

-- Activity feed policies
CREATE POLICY "Users can view their own activity" ON public.activity_feed FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own activity" ON public.activity_feed FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public can view activity" ON public.activity_feed FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_scores_updated_at BEFORE UPDATE ON public.user_scores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default badges
INSERT INTO public.badges (key, name, description, icon) VALUES
('welcome', 'Welcome Aboard', 'Earned by joining DSA Viz', 'trophy'),
('first_solve', 'First Blood', 'Solved your first problem', 'target'),
('streak_7', 'Week Warrior', 'Maintained a 7-day streak', 'flame'),
('streak_30', 'Monthly Master', 'Maintained a 30-day streak', 'fire'),
('easy_10', 'Easy Peasy', 'Solved 10 easy problems', 'star'),
('medium_10', 'Medium Maven', 'Solved 10 medium problems', 'zap'),
('hard_5', 'Hard Hitter', 'Solved 5 hard problems', 'crown'),
('quiz_ace', 'Quiz Ace', 'Scored 100% on a quiz', 'award'),
('problem_50', 'Half Century', 'Solved 50 problems', 'medal'),
('problem_100', 'Century Club', 'Solved 100 problems', 'gem');

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  welcome_badge_id UUID;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (user_id, username, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'username',
    NEW.email
  );
  
  -- Insert user scores
  INSERT INTO public.user_scores (user_id)
  VALUES (NEW.id);
  
  -- Award welcome badge
  SELECT id INTO welcome_badge_id FROM public.badges WHERE key = 'welcome';
  IF welcome_badge_id IS NOT NULL THEN
    INSERT INTO public.user_badges (user_id, badge_id)
    VALUES (NEW.id, welcome_badge_id);
    
    -- Add activity
    INSERT INTO public.activity_feed (user_id, activity_type, title, description)
    VALUES (NEW.id, 'badge_earned', 'Welcome Badge Earned!', 'You earned the Welcome Aboard badge for joining DSA Viz');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for performance
CREATE INDEX idx_problem_solve_user ON public.problem_solve_history(user_id);
CREATE INDEX idx_problem_solve_date ON public.problem_solve_history(solved_at);
CREATE INDEX idx_quiz_history_user ON public.quiz_history(user_id);
CREATE INDEX idx_activity_feed_user ON public.activity_feed(user_id);
CREATE INDEX idx_activity_feed_date ON public.activity_feed(created_at);
CREATE INDEX idx_user_scores_points ON public.user_scores(total_points DESC);