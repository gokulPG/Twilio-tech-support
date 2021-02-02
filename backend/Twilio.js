const twilio = require("twilio");
const VoiceResponse = require("twilio/lib/twiml/VoiceResponse");

class Twilio {
  phoneNumber = process.env.PHONE_NUMBER;
  phoneNumberSid = process.env.PHONE_NUMBER_SID;
  tokenSid = process.env.TOKEN_SID;
  tokenSecret = process.env.TOKEN_SECRET;
  accountSid = process.env.ACCOUNT_SID;
  verify = process.env.VERIFY;
  outgoingApplicationSid = process.env.OUTGOING_APP_SID;
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

  voiceResponse(message) {
    const twiml = new VoiceResponse();
    twiml.say(
      {
        voice: "Polly.Aditi",
      },
      message
    );
    twiml.redirect("https://goku-callcenter.loca.lt/enqueue");
    return twiml;
  }

  enqueueCall(queueName) {
    const twiml = new VoiceResponse();
    twiml.enqueue(queueName);
    return twiml;
  }

  redirectCall(client) {
    const twiml = new VoiceResponse();
    twiml.dial().client(client);
    return twiml;
  }

  answerCall(sid) {
    console.log('this will redirect the call with this SID to this url address', sid)
     this.client.calls(sid)
     .update({
       method: 'POST',
       url: 'https://goku-callcenter.loca.lt/connect-call'
     })
     .then(call => console.log(call, "CALLL"))
     .catch(err => console.error(err))
  }

  getAccessTokenForVoice = (identity) => {
    console.log( `Access token for ${identity}`)
    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;
    const outgoingAppSid = this.outgoingApplicationSid;
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: outgoingAppSid,
      incomingAllow: true
    })

    const token = new AccessToken(
      this.accountSid,
      this.tokenSid, 
      this.tokenSecret,
      {identity}
    )

    token.addGrant(voiceGrant)
    console.log('Access granted with JWT', token.toJwt());
    return token.toJwt()
  }
}

const instance = new Twilio();

Object.freeze(instance); //Cannot the change the instance, once its created

module.exports = instance;
