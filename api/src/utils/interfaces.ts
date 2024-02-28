// User

export interface IInitialUser {
  address: string;
}

export interface IUser {
  id: number;
  name: string | null;
  biography: string | null;
  icon: string | null;
  key_img: string | null;
  address: string;
  code_id: number;
  key_price: number | null;
  ranking: number | null;
  point: number | null;
  is_online: boolean;
  notification: boolean;
  last_login: Date;
  created_at: Date;
}

export interface ICreateUser {
  name: string;
  biography: string | null;
  icon: string | null;
  keyImage: string | null;
  address: string;
}

export interface IUpdateUser {
  biography: string | null;
  icon: string | null;
  keyImage: string | null;
}

// Holder

export interface IHolder {
  id: number;
  holder_id: number;
  object_id: number;
  created_at: Date;
}

export interface IWatchList {
  user_id: number;
  watch_user_id: number;
  register: boolean;
}

// Chat

export interface IAllChat {
  id: number;
  user_id: number;
  created_at: Date;
  User?: {
    name: string | null;
    icon: string | null;
    key_price?: number | null;
  } | null;
}

export interface IChat {
  id: number;
  User: IUser | null;
}

export interface IChatWithMessage extends IChat {
  Messages: IMessage[];
}

// Message

export interface IMessage {
  id: number;
  chat_id: number;
  user_id: number;
  text: string;
}

export interface IUserMessage {
  User: {
    name: string;
    icon: string;
    key_price: number;
  };
  Messages: {
    User: {
      id: number;
      name: string;
      icon: string;
      address: string;
    };
    text: true;
    created_at: true;
  }[];
}

export interface ITrade {
  id: number;
  buy_user_id: number;
  sell_user_id: number;
  key_price: number;
  is_buy: boolean;
  trade_at: Date;
  created_at: Date;
}

// Point
export interface IPoint {
  id: number;
  user_id: number;
  point: number;
  action_user_id: number;
  created_at: Date;
}

// Session
export interface IReqSession {
  id: string;
  address: string;
  code_verifier?: string;
  state?: string;
}

export interface ISession {
  id: number;
  sid: string;
  sess?:
    | {
        cookie: {
          originalMaxAge: number | null;
          expires: string | null;
          secure: boolean;
          httpOnly: boolean;
          path: string;
          sameSite: boolean | "lax" | "strict" | "none";
        };
        address?: string;
        code_verifier?: string;
        state?: string;
      }
    | unknown;
}

// Code
export interface ICode {
  code: string;
}
