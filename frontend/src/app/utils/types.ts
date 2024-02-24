import { Address } from 'viem'

// Onchain

export type IAddress = Address

// User
export interface IUser {
  name: string
  biography?: string
  icon: string
  key_img?: string
  address: string
  twitter_id?: string
  code?: string
  key_price?: number
  ranking?: number
  point?: number
  is_online?: boolean
  notification?: boolean
  last_login?: string
  register?: boolean
  created_at: Date
}

export interface IUserInfo {
  objectUserIcon?: string
  objectUserName?: string
  objectTwitterUrl?: string
  objectHolderCount?: number
  objectHoldKeyNftCount?: number
  objectWatchListCount?: number
  objectKeyPrice?: number
  userOwnKeyCount?: number
  userIsRegisterWatchlist?: boolean
  objectIsOnline?: boolean
}

export interface IUserList {
  Buyer: {
    icon: string
    name: string
    address: string
  }
  Seller: {
    icon: string
    name: string
    address: string
  }
  id: number
  buy_user_id: number
  sell_user_id: number
  key_price: number
  amount: number
  profit: number
  is_buy: boolean
  trade_at: Date
  created_at: Date
}

// Chat
export interface IChat {
  userIcon: string
  userName: string
  timestamp: string
  latestMessage: string
  keyPrice: number
  unReadMessage: number
  kingMark: boolean
}

// Message
export interface IMessage {
  userIcon: string
  userName: string
  timestamp: string
  message: string
}

// Search

export interface ITop {
  _count: {
    Holders: number
  }
  name: string
  address: string
  icon: string
  key_price: number
}

export interface INewChat {
  userName: string
  lastLogin: string
  keyPrice: number
}

export interface ITrend {
  userName: string
  lastLogin: string
  keyVolume: number
  keyPrice: number
}

// AirDrop
export interface IAirDrop {
  points?: number
  lastWeekPoints?: number
  weeklyLeaderBoard?: number
  roles?: Array<string>
  inviteCode?: string
}

// Wallet

export interface IWallet {
  userName?: string
  address?: string
}

// Chat
export interface IChatUser {
  User: {
    name?: string
    biography?: string
    icon?: string
    key_img?: string
    address: string
    twitter_id?: string
    code?: string
    key_price?: number
    ranking?: number
    point?: number
    is_online?: boolean
    notification?: boolean
    last_login?: string
    register?: boolean
    created_at: Date
  }
}
