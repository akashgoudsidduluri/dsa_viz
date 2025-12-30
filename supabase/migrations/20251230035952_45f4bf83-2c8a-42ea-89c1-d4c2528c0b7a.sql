-- Drop the overly permissive public policy that exposes sensitive user activity data
DROP POLICY IF EXISTS "Public can view scores for ranking" ON public.user_scores;

-- Create a SECURITY DEFINER function to calculate user ranking
-- This allows ranking calculation without exposing all user_scores data
CREATE OR REPLACE FUNCTION public.get_user_ranking(p_user_id uuid)
RETURNS TABLE (
  global_rank bigint,
  total_users bigint,
  percentile integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_points integer;
  users_above bigint;
  user_count bigint;
BEGIN
  -- Get the requesting user's points
  SELECT total_points INTO user_points
  FROM user_scores
  WHERE user_id = p_user_id;
  
  -- If user not found, return nulls
  IF user_points IS NULL THEN
    RETURN QUERY SELECT NULL::bigint, NULL::bigint, NULL::integer;
    RETURN;
  END IF;
  
  -- Count users with more points
  SELECT COUNT(*) INTO users_above
  FROM user_scores
  WHERE total_points > user_points;
  
  -- Count total users
  SELECT COUNT(*) INTO user_count
  FROM user_scores;
  
  -- Calculate and return ranking
  RETURN QUERY SELECT 
    users_above + 1 AS global_rank,
    user_count AS total_users,
    GREATEST(0, ROUND((1 - (users_above + 1)::numeric / user_count) * 100))::integer AS percentile;
END;
$$;