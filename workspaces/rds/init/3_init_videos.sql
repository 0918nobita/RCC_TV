CREATE TABLE rcctv.videos (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title varchar(50) NOT NULL,
  description TEXT,
  url TEXT,
  thumbnail TEXT,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO rcctv.videos (title, description, url) VALUES
  ('テスト1', '説明文1', 'http://localhost:3000/video.m3u8'),
  ('テスト2', '説明文2', 'http://localhost:3000/video.m3u8'),
  ('テスト3', '発表者が 2 名の場合のテスト', 'http://localhost:3000/video.m3u8');
