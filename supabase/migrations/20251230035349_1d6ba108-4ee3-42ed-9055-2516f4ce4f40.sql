-- Drop the overly permissive public policy that exposes sensitive user data (email, phone, etc.)
DROP POLICY IF EXISTS "Public profiles are viewable" ON public.profiles;