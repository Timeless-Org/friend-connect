import { Request, Response } from "express";
import { ConnectTwitterService, VerifyCodeService } from "../services/login";
import { normalizeErrorMessage } from "../lib/error";

export const ConnectTwitterController = async (req: Request, res: Response) => {
  try {
    const result = await ConnectTwitterService();
    if (result) {
      res.status(200).json({ message: "success" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.log(`👾 ConnectTwitterController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const VerifyCodeController = async (req: Request, res: Response) => {
  const { code, address } = req.body;
  if (!code || !address)  res.status(400).json({ message: "Bad Request" });

  try {
    const lowerAddress = address.toLowerCase();
    const result = await VerifyCodeService(code, lowerAddress);
    if (result) {
      res.status(200).json({ message: "success" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err: unknown) {
    const normalizedMessage = normalizeErrorMessage(err);
    if (normalizedMessage.includes("already added point")) {
      res.status(400).json({ message: "Already added point" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
