-- Add image_url to skills
ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS image_url TEXT;
