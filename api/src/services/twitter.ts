import { TwitterApi } from "twitter-api-v2";
import { updateUserTwitterAuthModel } from "../models/user";
import { TWITTER_CALLBACK_URL, TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET } from "../utils/config";

export const generateAuthLinkService = async (sessionId: string) => {
  const client = new TwitterApi({
    clientId: TWITTER_CLIENT_ID,
    clientSecret: TWITTER_CLIENT_SECRET,
  });
  const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
    `${TWITTER_CALLBACK_URL}?session_id=${sessionId}`,
    {
      scope: ["tweet.read", "users.read", "offline.access"],
    },
  );

  return { url, codeVerifier, state };
};

export const redirectAuthLinkService = async (
  sessionId: string,
  address: string,
  code: string,
  codeVerifier: string,
) => {
  try {
    const client = new TwitterApi({
      clientId: TWITTER_CLIENT_ID,
      clientSecret: TWITTER_CLIENT_SECRET,
    });
    const {
      client: loggedClient,
      accessToken,
      refreshToken,
      expiresIn,
    } = await client.loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: `${TWITTER_CALLBACK_URL}?session_id=${sessionId}`,
    });
    if (
      loggedClient &&
      typeof accessToken === "string" &&
      typeof refreshToken === "string" &&
      typeof expiresIn === "number"
    ) {
      const { data: userObject } = await loggedClient.v2.me();
      console.log(`userObject: ${JSON.stringify(userObject)}`);
      // const name = userObject.name;
      // const profile_image_url = await loggedClient.;
      // console.log(`user: ${JSON.stringify(user)}`);
      // const userIcon = userObject.profile_image_url;
      await updateUserTwitterAuthModel(address, accessToken, refreshToken, expiresIn);
      // await updateUserNameModel(address, name);
      return true;
    }
    return false;
  } catch (err) {
    console.error(`👾 redirectAuthLinkService: ${err}`);
    return false;
  }
};
