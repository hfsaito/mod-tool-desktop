import { TWITCH_API_URL } from '../constants';
import { requester } from '../requester';

export type GetParams = {
  after?: string; // Cursor for forward pagination: tells the server where to start fetching the next set of results, in a multi-page response. The cursor value specified here is from the pagination response field of a prior query.
  before?: string; // Cursor for backward pagination: tells the server where to start fetching the next set of results, in a multi-page response. The cursor value specified here is from the pagination response field of a prior query.
  first?: number; // Maximum number of objects to return. Maximum: 100. Default: 20.
  game_id?: string | string[]; // Returns streams broadcasting a specified game ID. You can specify up to 100 IDs.
  language?: string | string[]; // Stream language. You can specify up to 100 languages. A language value must be either the ISO 639-1 two-letter code for a supported stream language or “other”.
  user_id?: string | string[]; // Returns streams broadcast by one or more specified user IDs. You can specify up to 100 IDs.
  user_login?: string | string[]; // Returns streams broadcast by one or more specified user login names. You can specify up to 100 names.
};
export type GetResponse = {
  data: {
    id: string; // Stream ID.
    user_id: string; // ID of the user who is streaming.
    user_login: string; // Login of the user who is streaming.
    user_name: string; // Display name corresponding to user_id.
    game_id: string; // ID of the game being played on the stream.
    game_name: string; // Name of the game being played.
    type: 'live' | ''; // Stream type: "live" or "" (in case of error).
    title: string; // Stream title.
    viewer_count: number; // Number of viewers watching the stream at the time of the query.
    started_at: string; // UTC timestamp.
    language: string; // Stream language. A language value is either the ISO 639-1 two-letter code for a supported stream language or “other”.
    thumbnail_url: string; // Thumbnail URL of the stream. All image URLs have variable width and height. You can replace {width} and {height} with any values to get that size image
    tag_ids: string[]; // Shows tag IDs that apply to the stream.
    is_mature: boolean; // Indicates if the broadcaster has specified their channel contains mature content that may be inappropriate for younger audiences.
  }[];
  pagination: { // containing a string	A cursor value, to be used in a subsequent request to specify the starting point of the next set of results.
    cursor?: string;
  };
};

type Get = (params: GetParams) => Promise<GetResponse>;

export const get: Get = async (params) => {
  const response = await requester.get<GetResponse>(
    `${TWITCH_API_URL}/streams`,
    { params }
  );

  return response.data;
};
