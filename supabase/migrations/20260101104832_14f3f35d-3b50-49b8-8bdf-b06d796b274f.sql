-- Drop the overly permissive public policy that exposes user badges data
DROP POLICY IF EXISTS "Public can view user badges" ON public.user_badges;

-- Add profile field validation constraints using triggers instead of CHECK constraints
-- Triggers are more flexible and avoid issues with immutability requirements

-- Create validation trigger function for profiles
CREATE OR REPLACE FUNCTION public.validate_profile_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate bio length (max 200 characters)
  IF NEW.bio IS NOT NULL AND char_length(NEW.bio) > 200 THEN
    RAISE EXCEPTION 'Bio must be 200 characters or less';
  END IF;
  
  -- Validate additional_info length (max 500 characters)
  IF NEW.additional_info IS NOT NULL AND char_length(NEW.additional_info) > 500 THEN
    RAISE EXCEPTION 'Additional info must be 500 characters or less';
  END IF;
  
  -- Validate phone format (basic international format)
  IF NEW.phone IS NOT NULL AND NEW.phone !~ '^\+?[0-9\s\-\(\)]{7,20}$' THEN
    RAISE EXCEPTION 'Invalid phone number format';
  END IF;
  
  -- Validate date of birth (not in future, not before 1900)
  IF NEW.date_of_birth IS NOT NULL THEN
    IF NEW.date_of_birth > CURRENT_DATE THEN
      RAISE EXCEPTION 'Date of birth cannot be in the future';
    END IF;
    IF NEW.date_of_birth < '1900-01-01'::date THEN
      RAISE EXCEPTION 'Date of birth must be after 1900';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for INSERT
CREATE TRIGGER validate_profile_insert
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_profile_fields();

-- Create trigger for UPDATE
CREATE TRIGGER validate_profile_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_profile_fields();