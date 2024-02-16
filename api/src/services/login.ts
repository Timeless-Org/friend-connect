import { verificateCodeModel } from "../models/code";
import { createPoint, getSpecificPointModel } from "../models/point";
import { getUserFromCodeModel } from "../models/user";

export const ConnectTwitterService = async (): Promise<boolean> => {
  try {
    // const twitter = new Twitter({
    //     TWITTER_CONSUMER_KEY: process.env.TWITTER_API_KEY!,
    //     TWITTER_CONSUMER_SECRET: process.env.TWITTER_API_SECRET!,
    // });
    // const requestToken = await twitter.getRequestToken("http://localhost:3000/login");
    // const url = twitter.getAuthUrl(requestToken);
    // console.log(url);
    return true;
  } catch (err) {
    console.log(`👾 ConnectTwitterService: ${err}`);
    return false;
  }
};

export const VerifyCodeService = async (code: string, address: string): Promise<boolean> => {
  try {
    const res = await verificateCodeModel(code);
    if (res) {
      const user = await getUserFromCodeModel(code);
      if (!user || user.address === address) throw new Error("User not found");
      const alreadyAddPoint = await getSpecificPointModel(address, 0);
      if (alreadyAddPoint.length > 0) throw new Error("Already added point");
      await createPoint(user.address.toLowerCase(), address, 0);
      return true;
    }
    return false;
  } catch (err) {
    console.log(`👾 VerifyCodeService: ${err}`);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    return false;
  }
};
