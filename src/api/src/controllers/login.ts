import { Request, Response } from "express";
import { ConnectTwitterService, VerifyCodeService } from "services/login";

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
  if (!code || !address) return res.status(400).json({ message: "Bad Request" });

  try {
    const result = await VerifyCodeService(code, address);
    if (result) {
      res.status(200).json({ message: "success" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.log(`👾 VerifyCodeController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
