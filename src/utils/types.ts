export type Channel = {
  name: string;
  status: 'offline' | 'online' | 'not-found';
  avatar?: string;
  game?: string;
  viewCount?: number;
}
