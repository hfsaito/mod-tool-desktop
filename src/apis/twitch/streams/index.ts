import { get, GetParams, GetResponse } from './get';

export const streams = {
  get
};

export type Streams = {
  Get: {
    Params: GetParams;
    Response: GetResponse;
  };
};
