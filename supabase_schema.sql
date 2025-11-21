-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  email text
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Allow public read access to profiles (needed for username lookup during login)
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

-- Allow users to insert their own profile
create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

-- Allow users to update their own profile
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );
