import "dotenv/config";
import { IAddress } from "@utils/types";

export const PRIVY_APP_ID: string = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
export const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const LONG_STAR_SHARE_CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_LONG_STAR_SHARE_CONTRACT_ADDRESS || "") as IAddress;
