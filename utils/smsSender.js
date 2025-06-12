// utils/smsSender.js
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to
    });
    console.log(`📩 SMS sent to ${to}: ${res.sid}`);
    return response;
  } catch (err) {
    console.error(`❌ Failed to send SMS to ${to}:`, err.message);
    throw err;
  }
};

module.exports = sendSMS;
