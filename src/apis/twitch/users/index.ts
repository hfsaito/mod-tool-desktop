import { get, GetParams, GetResponse } from './get';

export const users = {
  get
};

export type Users = {
  Get: {
    Params: GetParams;
    Response: GetResponse;
  }
}
