-- ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ
create table users (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  password_hash text not null,
  secret_word text not null,
  anon_code text unique not null,
  created_at timestamp default now(),
  last_seen timestamp default now()
);

-- ТАБЛИЦА ИСТОРИЙ
create table stories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  anon_code text not null,
  content text not null,
  category text default 'story',
  lang text default 'tk',
  likes integer default 0,
  views integer default 0,
  created_at timestamp default now()
);

-- ТАБЛИЦА КОММЕНТАРИЕВ
create table comments (
  id uuid default gen_random_uuid() primary key,
  story_id uuid references stories(id) on delete cascade,
  anon_code text not null,
  content text not null,
  created_at timestamp default now()
);

-- ТАБЛИЦА ИСПОВЕДЕЙ
create table confessions (
  id uuid default gen_random_uuid() primary key,
  anon_code text not null,
  content text not null,
  likes integer default 0,
  lang text default 'tk',
  created_at timestamp default now()
);

-- ТАБЛИЦА ВОПРОСОВ
create table questions (
  id uuid default gen_random_uuid() primary key,
  anon_code text not null,
  content text not null,
  lang text default 'tk',
  created_at timestamp default now()
);

-- ТАБЛИЦА ОТВЕТОВ НА ВОПРОСЫ
create table answers (
  id uuid default gen_random_uuid() primary key,
  question_id uuid references questions(id) on delete cascade,
  anon_code text not null,
  content text not null,
  likes integer default 0,
  created_at timestamp default now()
);

-- ТАБЛИЦА ЗНАКОМСТВ
create table profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  anon_code text unique not null,
  age integer,
  city text,
  about text,
  interests text[],
  lang text default 'tk',
  is_active boolean default true,
  created_at timestamp default now()
);

-- ТАБЛИЦА СООБЩЕНИЙ
create table messages (
  id uuid default gen_random_uuid() primary key,
  from_anon text not null,
  to_anon text not null,
  content text not null,
  is_read boolean default false,
  created_at timestamp default now()
);

-- ТАБЛИЦА ГОЛОСОВАНИЙ
create table votes (
  id uuid default gen_random_uuid() primary key,
  story_id uuid references stories(id) on delete cascade,
  anon_code text not null,
  vote text not null,
  created_at timestamp default now(),
  unique(story_id, anon_code)
);

-- ТАБЛИЦА ВОПРОСА ДНЯ
create table daily_questions (
  id uuid default gen_random_uuid() primary key,
  question_tk text not null,
  question_ru text not null,
  question_tr text not null,
  question_en text not null,
  active_date date unique not null,
  created_at timestamp default now()
);

-- ТАБЛИЦА ОТВЕТОВ НА ВОПРОС ДНЯ
create table daily_answers (
  id uuid default gen_random_uuid() primary key,
  question_id uuid references daily_questions(id),
  anon_code text not null,
  content text not null,
  likes integer default 0,
  created_at timestamp default now()
);

-- ИНДЕКСЫ ДЛЯ СКОРОСТИ
create index on stories(created_at desc);
create index on stories(category);
create index on stories(lang);
create index on confessions(created_at desc);
create index on messages(to_anon, is_read);
create index on messages(from_anon);
create index on profiles(lang, is_active);

-- ТЕСТОВЫЕ ДАННЫЕ
insert into daily_questions (question_tk, question_ru, question_tr, question_en, active_date) values
('Iň ýakyn adamlaryňdan näme gizleýärsiň?', 'Что вы скрываете от самых близких людей?', 'En yakınlarınızdan ne saklıyorsunuz?', 'What are you hiding from the people closest to you?', current_date);
