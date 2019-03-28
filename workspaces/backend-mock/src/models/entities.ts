import { VideosRecord, UsersRecord } from './records';

export interface VideoEntity extends VideosRecord {
  presenters: UsersRecord[];
}
