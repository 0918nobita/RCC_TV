export interface UsersRecord {
  id: number;
  name: string;
  screen_name: string;
  description: string;
  email: string;
  icon: string;
  created: Date;
  modified: Date;
}

export interface VideosRecord {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  created: Date;
  modified: Date;
}

export interface PresentationsRecord {
  user_id: number;
  video_id: number;
}
