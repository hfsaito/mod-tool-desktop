import { chunk, flatten, map, merge, uniq } from 'lodash';

import { Twitch, twitch } from "@apis";
import { Channel } from "@utils";

import { Store } from "./manager";
import { ImgUserNotFound } from '@assets';

type TwitchStream = Twitch['Streams']['Get']['Response']['data'][0];
type TwitchUser = Twitch['Users']['Get']['Response']['data'][0];
type UserStreamByLogin = { [key: string]: { user: TwitchUser, stream: TwitchStream } };

type ExampleState = {
  channels: Channel[];
  loading: boolean;
};

class GankListStore extends Store<ExampleState> {
  constructor() {
    super({ channels: [], loading: false });
  }

  async setChannels(displayNames: string[]) {
    this.setState({ loading: true });
    const logins = displayNames.map(displayName => displayName.toLowerCase());
    const displayNameByLogin = displayNames.reduce<{ [key: string]: string }>((map, displayName) => {
      map[displayName.toLowerCase()] = displayName;
      return map;
    }, {})
    const uniqueLogins = uniq(logins);
    const uniqueLoginsChunks = chunk(uniqueLogins, 20);

    const userStreamByLoginChunks = await Promise.all(
      uniqueLoginsChunks.map<Promise<UserStreamByLogin[]>>(async uniqueLoginsChunk => {
        const responseUsers = await twitch.users.get({ login: uniqueLoginsChunk });
        const responseStreams = await twitch.streams.get({ user_login: uniqueLoginsChunk, first: 100 });

        const userByLogin = responseUsers.data.reduce<{ [key: string]: TwitchUser }>((map, user) => {
          map[user.login] = user;
          return map;
        }, {});
        const streamByLogin = responseStreams.data.reduce<{ [key: string]: TwitchStream }>((map, stream) => {
          map[stream.user_login] = stream;
          return map;
        }, {});

        return uniqueLoginsChunk.map(login => ({
          [login]: {
            user: userByLogin[login],
            stream: streamByLogin[login]
          }
        }));
      })
    );

    const userStreamByLogin: UserStreamByLogin = merge({}, ...flatten(userStreamByLoginChunks));
    const channels = logins
      .map<Channel>(login => {
        const { user, stream } = userStreamByLogin[login];

        let status: Channel['status'] = 'not-found';

        if (Boolean(user)) {
          status = 'offline';
        }
        if (Boolean(stream)) {
          status = 'online';
        }

        return {
          name: displayNameByLogin[login],
          status,
          avatar: user?.profile_image_url ?? ImgUserNotFound,
          game: stream?.game_name,
          viewCount: stream?.viewer_count
        };
      });

    this.setState({ channels, loading: false });
  }

  removeChannel(index: number) {
    this.setState({
      channels: this.state.channels.filter((_, i) => i !== index)
    });
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
