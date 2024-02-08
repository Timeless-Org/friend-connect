import { createCodeModel } from "models/code";
import { getUserFromCodeModel, getUserModel } from "models/user";

export const ConnectTwitterService = async (): Promise<boolean> => {
  try {
    // const twitter = new Twitter({
    //     consumer_key: process.env.TWITTER_API_KEY!,
    //     consumer_secret: process.env.TWITTER_API_SECRET!,
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
    const user = await getUserFromCodeModel(code);
    const usedUser = await getUserModel(address);
    if (!user || !usedUser) {
      return false;
    }
    // calculate point
    const point = 0;
    const res = await createCodeModel(user.id, usedUser.id, point);
    if (res) return true;
    return false;
  } catch (err) {
    console.log(`👾 VerifyCodeService: ${err}`);
    return false;
  }
};
