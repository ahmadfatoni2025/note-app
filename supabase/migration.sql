-- ============================================
-- College Notes Website — Database Migration
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard → SQL Editor
-- ============================================

-- 1. Create the notes table
CREATE TABLE notes (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  content     TEXT,
  course_name TEXT,
  semester    TEXT,
  file_url    TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- 3. Create a public access policy (no auth for now)
CREATE POLICY "Allow public read" ON notes
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON notes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON notes
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete" ON notes
  FOR DELETE USING (true);

-- 4. Create storage bucket for file attachments
INSERT INTO storage.buckets (id, name, public)
  VALUES ('note-attachments', 'note-attachments', true);

-- 5. Allow public access to the storage bucket
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'note-attachments');

CREATE POLICY "Public upload access" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'note-attachments');

CREATE POLICY "Public delete access" ON storage.objects
  FOR DELETE USING (bucket_id = 'note-attachments');
