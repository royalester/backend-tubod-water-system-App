const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (mobile, message) => {
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+63${mobile.slice(1)}`, // e.g. 0917xxx → +63917xxx
  });
};

module.exports = sendSMS;
