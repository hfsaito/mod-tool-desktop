import axios from 'axios';

import {
  TWITCH_API_AUTH_URL,
  TWITCH_API_CLIENT_ID,
  TWITCH_API_CLIENT_SECRET
} from '../constants';

type ClientCredentialsResponse = {
  access_token: string;
  expires_in: number;
  token_type: 'bearer';
};

type ClientCredentials = () => Promise<ClientCredentialsResponse>;

export const clientCredentials: ClientCredentials = async () => {
  console.log('getting client credentials');

  const response = await axios
    .post<ClientCredentialsResponse>(
      TWITCH_API_AUTH_URL,
      null,
      {
        params: {
          client_id: TWITCH_API_CLIENT_ID,
          client_secret: TWITCH_API_CLIENT_SECRET,
          grant_type: 'client_credentials'
        }
      }
    )
    .catch((...args) => {
      console.error(...args);
      throw new Error('WTF');
    });

  console.log('got client credentials');

  return response.data;
};
