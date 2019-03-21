CREATE TABLE rcctv.users (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name varchar(15) NOT NULL UNIQUE,
  screen_name varchar(50) NOT NULL UNIQUE,
  description varchar(160),
  email varchar(256) NOT NULL UNIQUE,
  icon TEXT
);

INSERT INTO rcctv.users (name, screen_name, description, email, icon) VALUES
  ('0918nobita', 'Kodai', 'フロントエンド',   'foo@rcctv.dev', 'https://pbs.twimg.com/profile_images/1078682920410177542/UZswXxFI_400x400.jpg'),
  ('did0es',     'shuta', 'バックエンド担当', 'bar@rcctv.dev', 'https://pbs.twimg.com/profile_images/1093363391563890689/KgeR37Sv_400x400.jpg');
