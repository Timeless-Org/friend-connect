import { baseRequest } from './apiBase'
import { IUser, IUserList } from './types'

// login: wallet

export const createUser = async (address: string): Promise<boolean> => {
  try {
    const result = (await baseRequest('POST', '/user', { address })) as any
    return result?.data.message === 'Success'
  } catch (err: any) {
    console.error(`👾 createUser: ${JSON.stringify(err)}`)
    return err?.data?.message === 'User already exists'
  }
}

// login: code
export const codeVerify = async (code: string, address: string): Promise<boolean> => {
  const result = (await baseRequest('POST', '/login/code', {
    code,
    address
  })) as any
  return result?.data.message === 'Success'
}

// login: twitter auth link
export const getTwitterAuthLink = async (address: string): Promise<string> => {
  const result = (await baseRequest('GET', `/twitter/auth-link?address=${address}`)) as any
  return result?.data.url
}

// login: add user twitter profile
export const addUserTwitterProfile = async (
  address: string,
  name: string,
  icon: string,
  twitterId: string
): Promise<boolean> => {
  const result = (await baseRequest('PUT', `/user/${address}`, {
    name,
    icon,
    twitterId
  })) as any
  return result?.data.message === 'Success'
}

// login: add user biography
export const addUserBiography = async (address: string, biography: string): Promise<boolean> => {
  const result = (await baseRequest('PUT', `/user/${address}`, {
    biography
  })) as any
  return result?.data.message === 'Success'
}

// login: change user notification
export const addUserNotification = async (address: string, notification: boolean): Promise<boolean> => {
  const result = (await baseRequest('PUT', `/user/${address}`, {
    notification
  })) as any
  return result?.data.message === 'Success'
}

// login: change user register status
export const changeUserRegister = async (address: string): Promise<boolean> => {
  const result = (await baseRequest('PUT', `/user/${address}`, {
    register: true
  })) as any
  return result?.data.message === 'Success'
}

// user: get
export const getUser = async (address: string): Promise<any> => {
  const data = await baseRequest('GET', `/user/${address}`)
  return data.data as IUser
}

// user: get watchlist
export const getWatchlist = async (address: string): Promise<any> => {
  const data = await baseRequest('GET', `/user/watchlists/${address}`)
  return data.data as IUserList[]
}

// user: update watchlist
export const updateWatchlist = async (address: string, watchAddress: string): Promise<boolean> => {
  const result = (await baseRequest('PUT', '/user/watchlist', {
    address,
    watchAddress
  })) as any
  return result?.data.message === 'Success'
}

// trade: post
export const createTrade = async (
  buyAddress: string,
  sellAddress: string,
  keyPrice: number,
  amount: number,
  isBuy: boolean
): Promise<boolean> => {
  const result = (await baseRequest('POST', '/trade', {
    buyAddress,
    sellAddress,
    keyPrice,
    amount,
    isBuy
  })) as any
  return result?.data.message === 'Success'
}

// trade: user
export const getUserTrade = async (address: string): Promise<any> => {
  const data = await baseRequest('GET', `/trade/${address}`)
  return data.data.trades as IUserList[]
}

// trade: all user
export const getAllUserTrade = async (): Promise<any> => {
  const data = await baseRequest('GET', `/trade/all`)
  return data.data.trades as IUserList[]
}

// trade: all user
export const getTopUsers = async (): Promise<any> => {
  const data = await baseRequest('GET', `/user/top-price-users`)
  return data.data as IUserList[]
}

// trade: watchlist
export const getWatchlistTrade = async (address: string): Promise<any> => {
  const data = await baseRequest('GET', `/trade/watchlist/${address}`)
  return data.data.trades as IUserList[]
}

// holder: get users
export const getHolders = async (address: string): Promise<any> => {
  const data = await baseRequest('GET', `/user/holder/${address}`)
  return data.data as IUserList[]
}

// hold: get users
export const getHoldObjects = async (address: string): Promise<any> => {
  const data = await baseRequest('GET', `/user/hold/${address}`)
  return data.data as IUserList[]
}

// code: get users
export const getCode = async (address: string): Promise<any> => {
  const data = await baseRequest('GET', `/user/code/${address}`)
  return data.data as string
}

// chat
export const getLatestChat = async (): Promise<any> => {
  const data = await baseRequest('GET', `/chat/latest`)
  return data.data as IUserList[]
}

// chat: user
export const getUserChat = async (address: string): Promise<any> => {
  const data = await baseRequest('GET', `/chat/${address}`)
  return data.data.chat as IUserList[]
}

// chat: user all chat
export const getUserChats = async (address: string): Promise<any> => {
  const data = await baseRequest('GET', `/chat/all/${address}`)
  return data.data.allChat as IUserList[]
}

// message: create a message
export const createMessage = async (address: string, objectAddress: string, text: string): Promise<boolean> => {
  const result = (await baseRequest('POST', '/message', {
    address,
    objectAddress,
    text
  })) as any
  return result?.data.message === 'Success'
}

// search
export const searchUser = async (keyword: string): Promise<any> => {
  const data = await baseRequest('GET', `/user/search/${keyword}`)
  return data.data as IUserList[]
}
