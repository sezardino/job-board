import crypto from "crypto-js";

export class Crypto {
  private generateRandomToken() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";

    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }

  generate(secret: string) {
    const randomToken = this.generateRandomToken();
    const tokenWithSecret = randomToken + secret;

    const hmac = crypto.HmacSHA256(tokenWithSecret, secret);

    return hmac.toString(crypto.enc.Hex);
  }
}
