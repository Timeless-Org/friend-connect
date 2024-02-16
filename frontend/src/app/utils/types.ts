import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Address } from "viem";

// Onchain

export type IAddress = Address;

// User
export interface IUser {
  name?: string;
  biography?: string;
  icon?: string;
  key_img?: string;
  address?: string;
  code?: string;
  key_price?: number;
  ranking?: number;
  point?: number;
  is_online?: boolean;
  notification?: boolean;
  last_login?: string;
}

export interface IUserInfo {
  objectUserIcon?: string;
  objectUserName?: string;
  objectTwitterUrl?: string;
  objectHolderCount?: number;
  objectHoldKeyNftCount?: number;
  objectWatchListCount?: number;
  objectKeyPrice?: number;
  userOwnKeyCount?: number;
  userIsRegisterWatchlist?: boolean;
  objectIsOnline?: boolean;
}

export interface IUserList {
  tradeUser: IconProp;
  objectUser: IconProp;
  tradeUserName: string;
  objectUserName: string;
  timestamp: string;
  amount: number;
  value: number;
  kingMark: boolean;
  isBuy: boolean;
}

// Chat
export interface IChat {
  userIcon: string;
  userName: string;
  timestamp: string;
  latestMessage: string;
  keyPrice: number;
  unReadMessage: number;
  kingMark: boolean;
}

// Message
export interface IMessage {
  userIcon: string;
  userName: string;
  timestamp: string;
  message: string;
}

// Search

export interface ITop {
  userName: string;
  holders: number;
  keyPrice: number;
}

export interface INewChat {
  userName: string;
  lastLogin: string;
  keyPrice: number;
}

export interface ITrend {
  userName: string;
  lastLogin: string;
  keyVolume: number;
  keyPrice: number;
}

// AirDrop
export interface IAirDrop {
  points?: number;
  lastWeekPoints?: number;
  weeklyLeaderBoard?: number;
  roles?: Array<string>;
  inviteCode?: string;
}

// Wallet

export interface IWallet {
  userName?: string;
  address?: string;
}
