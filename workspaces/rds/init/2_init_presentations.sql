CREATE TABLE rcctv.presentations (
  user_id INT NOT NULL,
  video_id INT NOT NULL
);

INSERT INTO rcctv.presentations (user_id, video_id) VALUES
  (1, 1),
  (2, 2),
  (1, 3),
  (2, 3);
