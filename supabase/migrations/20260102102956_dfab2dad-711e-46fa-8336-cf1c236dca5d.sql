-- Create table for tracking daily time spent
CREATE TABLE public.daily_time_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE public.daily_time_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own time tracking"
ON public.daily_time_tracking
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own time tracking"
ON public.daily_time_tracking
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own time tracking"
ON public.daily_time_tracking
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_daily_time_tracking_updated_at
BEFORE UPDATE ON public.daily_time_tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();