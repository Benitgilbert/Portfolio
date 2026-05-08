-- Portfolio Profile
CREATE TABLE IF NOT EXISTS public.profile (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    full_name TEXT NOT NULL,
    headline TEXT,
    bio TEXT,
    location TEXT,
    email TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    photo_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    long_description TEXT,
    image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Skills
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g., 'Frontend', 'Backend', 'ML', 'Tools'
    icon_name TEXT,
    proficiency INT DEFAULT 100,
    order_index INT DEFAULT 0
);

-- Education
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    period TEXT, -- e.g., '2021 - 2025'
    description TEXT,
    coursework TEXT[] DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

-- Select policies (Public)
CREATE POLICY "Public profile is viewable by everyone" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Skills are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Education is viewable by everyone" ON public.education FOR SELECT USING (true);

-- Authenticated Insert/Update/Delete (Only Owner)
CREATE POLICY "Owners can modify profile" ON public.profile FOR ALL USING (auth.uid() = id);
CREATE POLICY "Owners can modify projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Owners can modify skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Owners can modify education" ON public.education FOR ALL USING (auth.role() = 'authenticated');
