import { search } from './search';
import { Streams, streams } from './streams';
import { Users, users } from './users';

export const twitch = {
  search,
  streams,
  users
};

export type Twitch = {
  Streams: Streams;
  Users: Users;
};
