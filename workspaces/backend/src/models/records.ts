export interface UsersRecord {
  id: number;
  name: string;
  screen_name: string;
  description: string;
  email: string;
  icon: string;
}

export interface VideosRecord {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

export interface PresentationsRecord {
  user_id: number;
  video_id: number;
}
