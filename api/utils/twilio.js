// twilioService.mjs
// twilioService.mjs
import  Twilio  from 'twilio';

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const verifyServiceSid = process.env.TWILIO_VERIFY;

const sendOtp = async (mobileNumber) => {
  try {
    await client.verify.services(verifyServiceSid).verifications.create({
      to: `+91${mobileNumber}`,
      channel: 'sms',
    });
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to send verification code");
  }
}; 

const verifyCode = async (mobileNumber, code) => {
  try {
        const verification = await client.verify.v2.services(verifyServiceSid).verificationChecks.create({
      to: `+91${mobileNumber}`,
      code: code,
    });

    if (verification.status === 'approved') {
      console.log("Verification successful!");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to verify code");
  }
};

export { sendOtp, verifyCode };

