import { Request, Response } from "express";
import { VerifyCodeService } from "../services/login";
import { normalizeErrorMessage } from "../utils/error";

export const VerifyCodeController = async (req: Request, res: Response) => {
  const { code, address } = req.body;
  if (!code || !address) res.status(400).json({ message: "Bad Request" });

  try {
    const lowerAddress = address.toLowerCase();
    const result = await VerifyCodeService(code, lowerAddress);
    if (result) {
      res.status(200).json({ message: "Success" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err: unknown) {
    const normalizedMessage = normalizeErrorMessage(err);
    if (normalizedMessage.includes("User not found")) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
