import cors from "cors";
import helmet from "helmet";
import express, { Application, Request, Response } from "express";
import userRouters from "./routers/user";
import nftRouters from "./routers/nft";
import loginRouters from "./routers/login";
import chatRouters from "./routers/chat";
import messageRouters from "./routers/message";
import pointRouters from "./routers/point";
import sessionRouters from "./routers/session";
import tradeRouters from "./routers/trade";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// /*
//  * Application settings for Express
//  */
export const app: Application = express();
app.set("trust proxy", 1); // trust first proxy

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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
app.use("/v1/user", userRouters);
app.use("/v1/nft", nftRouters);
app.use("/v1/login", loginRouters);
app.use("/v1/chat", chatRouters);
app.use("/v1/message", messageRouters);
app.use("/v1/point", pointRouters);
app.use("/v1/trade", tradeRouters);
app.use("/v1/session", sessionRouters);

app.get("/v1", (req: Request, res: Response) => {
  return res.status(200).send({
    message: "hello world",
  });
});

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    message: "hello world",
  });
});
