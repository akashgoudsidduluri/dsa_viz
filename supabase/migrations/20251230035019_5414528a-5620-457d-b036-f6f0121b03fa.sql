-- Drop the overly permissive public policy that exposes user activity data
DROP POLICY IF EXISTS "Public can view activity" ON public.activity_feed;