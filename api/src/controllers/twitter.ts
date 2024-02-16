import { Request, Response } from "express";
import { getSessionModel } from "../models/session";
import { generateAuthLinkService, redirectAuthLinkService } from "../services/twitter";
import { TWITTER_REDIRECT_URL } from "../utils/config";
import { IReqSession } from "../utils/interfaces";

export const generateAuthLinkServiceController = async (req: Request, res: Response) => {
  try {
    const { address } = req.query as { address: string };
    const session = req.session as IReqSession;
    const sessionId = session.id;
    const { url, codeVerifier, state } = await generateAuthLinkService(sessionId);
    session.address = address.toLowerCase();
    session.code_verifier = codeVerifier;
    session.state = state;
    res.status(200).json({ url });
  } catch (err) {
    console.error(`👾 generateAuthLinkServiceController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const redirectAuthLinkController = async (req: Request, res: Response) => {
  const { state, code, session_id } = req.query as unknown as { state: string; code: string; session_id: string };

  const session = await getSessionModel(session_id);
  const sessionData = session?.sess as IReqSession;

  const codeVerifier = sessionData?.code_verifier;
  const sessionState = sessionData?.state;
  const address = sessionData?.address;
  const lowerAddress = address.toLowerCase();

  if (!codeVerifier || !state || !sessionState || !code || typeof code !== "string") {
    return res.status(400).send("You denied the app or your session expired!");
  }
  if (state !== sessionState) {
    return res.status(400).send("Stored tokens didnt match!");
  }

  try {
    const result = await redirectAuthLinkService(session_id, lowerAddress, code, codeVerifier);
    if (result) {
      console.log(`TWITTER_REDIRECT_URL: ${TWITTER_REDIRECT_URL}`);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.redirect(TWITTER_REDIRECT_URL);
    } else {
      console.log("fbadf0b98na09f8db0ahfb0adfb");
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    res.status(403).send("Invalid verifier or access tokens!");
  }
};
