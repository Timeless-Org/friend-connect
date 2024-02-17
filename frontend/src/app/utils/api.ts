import { baseRequest } from "./apiBase";
import { IUserList } from "./types";

// login: wallet

export const createUser = async (address: string): Promise<boolean> => {
  try {
    const result = (await baseRequest("POST", "/user", { address })) as any;
    return result?.data.message === "success";
  } catch (err: any) {
    console.error(`👾 createUser: ${JSON.stringify(err)}`);
    return err?.data?.message === "User already exists";
  }
};

// login: code
export const codeVerify = async (
  code: string,
  address: string
): Promise<boolean> => {
  const result = (await baseRequest("POST", "/login/code", {
    code,
    address,
  })) as any;
  return result?.data.message === "success";
};

// login: twitter auth link
export const getTwitterAuthLink = async (address: string): Promise<string> => {
    const result = (await baseRequest("GET", `/twitter/auth-link?address=${address}`)) as any;
    return result?.data.url;
}

// login: add user twitter profile
export const addUserTwitterProfile = async (
  address: string,
  name: string,
  icon: string
): Promise<boolean> => {
  const result = (await baseRequest("PUT", `/user/${address}`, {
    name,
    icon,
  })) as any;
  return result?.data.message === "success";
};


// login: add user biography
export const addUserBiography = async (
  address: string,
  biography: string,
): Promise<boolean> => {
  const result = (await baseRequest("PUT", `/user/${address}`, {
    biography,
  })) as any;
  return result?.data.message === "success";
};

// login: change user notification
export const addUserNotification = async (
  address: string,
  notification: boolean,
): Promise<boolean> => {
  const result = (await baseRequest("PUT", `/user/${address}`, {
    notification,
  })) as any;
  return result?.data.message === "success";
};

// trade: post
export const createTrade = async (
  buyAddress: string,
  sellAddress: string,
  keyPrice: number,
  isBuy: boolean
): Promise<boolean> => {
  const result = (await baseRequest("POST", "/trade", {
    buyAddress,
    sellAddress,
    keyPrice,
    isBuy,
  })) as any;
  return result?.data.message === "Success";
};

// trade: user
export const getUserTrade = async (address: string): Promise<any> => {
  const data = await baseRequest("GET", `/trade/${address}`);
  return data.data.trades as IUserList[];
}
