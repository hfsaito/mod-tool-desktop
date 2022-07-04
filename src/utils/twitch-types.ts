type TwitchChannelOnline = {
  name: string;
  avatar: string;
  isLive: true;
  game: string;
  viewCount: number;
}

type TwitchChannelOffline = {
  name: string;
  avatar: string;
  isLive: false;
}

export type TwitchChannel = TwitchChannelOnline | TwitchChannelOffline;
