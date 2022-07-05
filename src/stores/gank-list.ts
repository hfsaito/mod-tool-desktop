import { chunk, flatten, uniq } from 'lodash';

import { Twitch, twitch } from "@apis";
import { Channel } from "@utils";

import { Store } from "./manager";
import { ImgUserNotFound } from '@assets';

type TwitchStream = Twitch['Streams']['Get']['Response']['data'][0];
type TwitchUser = Twitch['Users']['Get']['Response']['data'][0];

type ExampleState = {
  channels: Channel[];
  loading: boolean;
};

class GankListStore extends Store<ExampleState> {
  constructor() {
    super({ channels: [], loading: false });
  }

  async setChannels(userNames: string[]) {
    this.setState({ loading: true });
    const logins = uniq(userNames).map(user => user.toLowerCase());
    const loginChunks = chunk(logins, 20);
    const channelChunks = await Promise.all(
      loginChunks.map(async chunk => {
        const responseStreams = await twitch.streams.get({ user_login: logins, first: 100 });
        const responseUsers = await twitch.users.get({ login: logins });
    
        const streamByName = responseStreams.data.reduce<{ [key: string]: TwitchStream }>((map, stream) => {
          map[stream.user_login] = stream;
          return map;
        }, {});
        const userByName = responseUsers.data.reduce<{ [key: string]: TwitchUser }>((map, user) => {
          map[user.login] = user;
          return map;
        }, {});

        return chunk
          .map<Channel>(login => {
            const stream: TwitchStream | undefined = streamByName[login];
            const user = userByName[login];

            let status: Channel['status'] = 'not-found';

            if (Boolean(user)) {
              status = 'offline';
            }
            if (Boolean(stream)) {
              status = 'online';
            }

            return {
              name: login,
              status,
              avatar: user?.profile_image_url ?? ImgUserNotFound,
              game: stream?.game_name,
              viewCount: stream?.viewer_count
            };
          });
      })
    );

    const channels = flatten(channelChunks);
    this.setState({ channels, loading: false });
  }

  getOnlineChannels() {
    return this.state.channels.filter(channel => channel.status === 'online');
  }

  getOfflineChannels() {
    return this.state.channels.filter(channel => channel.status === 'offline');
  }

  getNotFoundChannels() {
    return this.state.channels.filter(channel => channel.status === 'not-found');
  }
}

export const gankListStore = new GankListStore();
