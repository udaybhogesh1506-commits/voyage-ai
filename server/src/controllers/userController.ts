import { Request, Response } from "express";
import User from "../models/User";

export const getUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "User fetch failed",
    });
  }
};