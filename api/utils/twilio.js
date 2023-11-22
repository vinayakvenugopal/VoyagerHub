// twilioService.mjs
// twilioService.mjs
import  Twilio  from 'twilio';

const client = new Twilio('ACed4175b83602429cfcf29f2f468ac634', '6998260d08ad737e662942acd9a6d827');
const verifyServiceSid = 'VAe8ed2dab6bfcfcec6f5af138dea578c9';

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

