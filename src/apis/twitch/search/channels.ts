import { TWITCH_API_URL } from '../constants';
import { requester } from '../requester';

type ChannelsParams = {
  query: string; // URl encoded search query
  first?: number; // Maximum number of objects to return. Maximum: 100 Default: 20
  after?: string; // Cursor for forward pagination: tells the server where to start fetching the next set of results, in a multi-page response. The cursor value specified here is from the pagination response field of a prior query.
  live_only?: boolean; // Filter results for live streams only. Default: false
};
type ChannelsResponse = {
  data: {
    broadcaster_language: string; //	Channel language (Broadcaster Language field from the Channels service). A language value is either the ISO 639-1 two-letter code for a supported stream language or “other”.
    broadcaster_login: string; // Login of the broadcaster.
    display_name: string; // 	Display name of the broadcaster.
    game_id: string; // ID of the game being played on the stream.
    game_name: string; // Name of the game being played on the stream.
    id: string; // Channel ID.
    is_live: boolean; // Indicates if the channel is currenty live.
    tag_ids: string[]; // Tag IDs that apply to the stream. This array only contains strings when a channel is live. For all possibilities, see List of All Tags. Category Tags are not returned.
    thumbnail_url: string; // Thumbnail URL of the stream. All image URLs have variable width and height. You can replace {width} and {height} with any values to get that size image.
    title: string; // Stream title.
    started_at: string; // UTC timestamp. Returns an empty string if the channel is not live.
  }[];
};

interface Channels {
  (params: ChannelsParams): Promise<ChannelsResponse>;
}

export const channels: Channels = async (params) => {
  const response = await requester.get<ChannelsResponse>(
    `${TWITCH_API_URL}/search/channels`,
    { params }
  );

  return response.data;
};
