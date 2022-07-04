import { clientCredentials } from "./client-credentials";
import { Token } from "./token";

export class AuthManager {
  private static generatingToken: Promise<void> | null = null;

  static async getToken() {
    if (Token.isExpired()) {
      if (!AuthManager.generatingToken) {
        AuthManager.generatingToken = new Promise(async done => {
          const response = await clientCredentials();
          Token.set(response.access_token, response.expires_in);
          done();
          AuthManager.generatingToken = null;
        });
      }
      await AuthManager.generatingToken;
    }
    return Token.get();
  }
}