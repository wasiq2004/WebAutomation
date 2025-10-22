# Supabase Setup Guide for ZenFlow

## Setting up Supabase

1. Go to [supabase.com](https://supabase.com/) and create an account
2. Create a new project
3. Once your project is ready, go to Project Settings > API
4. Copy your Project URL and anon key

## Environment Variables

Create a `.env.local` file in the root of your project with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace `your-project-url` and `your-anon-key` with your actual Supabase credentials.

## Database Tables

Create the following tables in your Supabase SQL editor:

### Flows Table

```sql
create table flows (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  steps jsonb,
  folder text,
  created_at timestamp with time zone default now(),
  status text
);
```

### Runs Table

```sql
create table runs (
  id uuid default gen_random_uuid() primary key,
  flow_id uuid references flows(id),
  executed_at timestamp with time zone default now(),
  result jsonb,
  status text
);
```

### Issues Table

```sql
create table issues (
  id uuid default gen_random_uuid() primary key,
  flow_id uuid references flows(id),
  message text,
  timestamp timestamp with time zone default now()
);
```

## RLS (Row Level Security)

Enable RLS for each table:

```sql
alter table flows enable row level security;
alter table runs enable row level security;
alter table issues enable row level security;
```

Create policies to allow read and write access:

```sql
create policy "Allow read access to flows" on flows
for select using (true);

create policy "Allow insert access to flows" on flows
for insert with check (true);

create policy "Allow update access to flows" on flows
for update using (true);

create policy "Allow read access to runs" on runs
for select using (true);

create policy "Allow insert access to runs" on runs
for insert with check (true);

create policy "Allow read access to issues" on issues
for select using (true);

create policy "Allow insert access to issues" on issues
for insert with check (true);
```

## Connecting to Supabase in Your App

The `supabaseClient.ts` file is already configured to use the environment variables. Make sure you've set them correctly in your `.env.local` file.

## Testing the Connection

To test if your Supabase connection is working, you can add the following to any page:

```typescript
import { supabase } from '@/lib/supabaseClient';

// Test function
async function testSupabase() {
  const { data, error } = await supabase
    .from('flows')
    .select('*');
    
  if (error) {
    console.error('Supabase error:', error);
  } else {
    console.log('Supabase data:', data);
  }
}
```