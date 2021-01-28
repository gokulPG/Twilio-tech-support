const twilio = require("twilio");

class Twilio {
  phoneNumber = process.env.PHONE_NUMBER;
  phoneNumberSid = process.env.PHONE_NUMBER_SID;
  tokenSid = process.env.TOKEN_SID;
  tokenSecret = process.env.TOKEN_SECRET;
  accountSid = process.env.ACCOUNT_SID;
  verify = process.env.VERIFY;
  client;

  constructor() {
    // console.log(this.phoneNumber, this.phoneNumberSid, this.tokenSid, this.accountSid, this.verify, this.tokenSecret)
    this.client = twilio(this.tokenSid, this.tokenSecret, {
      accountSid: this.accountSid,
    });
  }

  getTwilio() {
    this.client;
  }

  async sendVerifyAsync(to, channel) {
    const data = await this.client.verify
      .services(this.verify)
      .verifications.create({ to, channel });
    return data;
  }

  async verifyCodeAsync(to, code) {
    const data = await this.client.verify
      .services(this.verify)
      .verificationChecks.create({
        to,
        code,
      });
    console.log(data);
    return data;
  }
}

const instance = new Twilio();

Object.freeze(instance); //Cannot the change the instance, once its created

module.exports = instance;
