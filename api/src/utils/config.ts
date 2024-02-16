import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "local"}`,
});

export const NODE_ENV = process.env.NODE_ENV;
export const BACKEND_URL = process.env.BACKEND_URL as string;
export const APP_PORT: number = 8000;
export const FRONTEND_URL = process.env.FRONTEND_URL as string;
export const DATABASE_URL = process.env.DATABASE_URL as string;

// Twitter
export const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN as string;
export const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY as string;
export const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET as string;
export const TWITTER_CALLBACK_URL = `${BACKEND_URL}/api/v1/twitter/callback` as string;
const FRONTEND_DOMAIN: string = NODE_ENV === "local" ? "http://127.0.0.1:3000" : FRONTEND_URL;
export const TWITTER_REDIRECT_URL = `${FRONTEND_DOMAIN}/login/deposit` as string;
export const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN as string;
export const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET as string;
export const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID as string;
export const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET as string;

// CORS
export const ALLOWED_ORIGIN: string = process.env.ALLOWED_ORIGIN || "";
export const ALLOWED_ORIGINS: string[] | RegExp[] = ALLOWED_ORIGIN
  ? [ALLOWED_ORIGIN]
  : [/^http:\/\/localhost:.+/, /^http:\/\/127\.0\.0\.1:.+/, /^https:\/\/.+/, /^https:\/\/twitter.com.+/];
