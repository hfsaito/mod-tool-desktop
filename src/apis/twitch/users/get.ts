import { TWITCH_API_URL } from '../constants';
import { requester } from '../requester';

export type GetParams = {
  id?: string | string[]; // User ID. Multiple user IDs can be specified. Limit: 100.
  login?: string | string[]; // User login name. Multiple login names can be specified. Limit: 100.
};
export type GetResponse = {
  data: {
    broadcaster_type: 'partner' | 'affiliate' | ''; // User’s broadcaster type: "partner", "affiliate", or "".
    description: string; // User’s channel description.
    display_name: string; // User’s display name.
    id: string; // User’s ID.
    login: string; // User’s login name.
    offline_image_url: string; // URL of the user’s offline image.
    profile_image_url: string; // URL of the user’s profile image.
    type: 'staff' | 'admin' | 'global_mod'; // User’s type: "staff", "admin", "global_mod", or "".
    /*
     * Total number of views of the user’s channel.
     * NOTE: This field has been deprecated.
     * For information, see Get Users API endpoint – “view_count” deprecation.
     * The response continues to include the field; however, it contains stale data.
     * You should stop displaying this data at your earliest convenience.
     */
    view_count: number;     
    email: string; // User’s verified email address. Returned if the request includes the user:read:email scope.
    created_at: string; // Date when the user was created.
  }[];
};

interface Get {
  (params: GetParams): Promise<GetResponse>;
}

export const get: Get = async (params) => {
  const response = await requester.get<GetResponse>(
    `${TWITCH_API_URL}/users`,
    { params }
  );

  return response.data;
};
