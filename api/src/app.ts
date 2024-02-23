import { PrismaClient } from "@prisma/client";
import connectPgSimple from "connect-pg-simple";
import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import session from "express-session";
import helmet from "helmet";
import { CorsMiddleware } from "./middlewares";
import chatRouters from "./routers/chat";
import loginRouters from "./routers/login";
import messageRouters from "./routers/message";
import nftRouters from "./routers/nft";
import pointRouters from "./routers/point";
import sessionRouters from "./routers/session";
import tradeRouters from "./routers/trade";
import userRouters from "./routers/user";
import { DATABASE_URL } from "./utils/config";

export const prisma = new PrismaClient();

export const app: Application = express();
app.set("trust proxy", 1);
app.use(cookieParser());

// Session
declare module "express-session" {
  interface SessionData {
    address?: string;
    codeVerifier?: string;
    state?: string;
  }
}
const pgSession = connectPgSimple(session);
const sessionStore = new pgSession({
  conString: DATABASE_URL,
  createTableIfMissing: true,
  tableName: "Session",
  ttl: 3600,
  schemaName: "public",
  pruneSessionInterval: false,
  errorLog: (...args) => console.error(`sessionStoreError: ${args}`),
});

app.use(
  session({
    secret: "long_star",
    name: "long_star",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      // domain: DOMAIN,
      maxAge: 1000 * 60 * 60 * 12, // 1sec * 60(1min) * 60 (1h)
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CorsMiddleware.validateOrigin);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  }),
);
app.disable("x-powered-by");
app.use(helmet.noSniff());

// API endpoints
app.use("/api/v1/user", userRouters);
app.use("/api/v1/nft", nftRouters);
app.use("/api/v1/login", loginRouters);
app.use("/api/v1/chat", chatRouters);
app.use("/api/v1/message", messageRouters);
app.use("/api/v1/point", pointRouters);
app.use("/api/v1/trade", tradeRouters);
app.use("/api/v1/session", sessionRouters);

app.get("/api/v1", (req: Request, res: Response) => {
  return res.status(200).send({
    message: "hello world",
  });
});

app.get("/api", (req: Request, res: Response) => {
  return res.status(200).send({
    message: "hello world",
  });
});
