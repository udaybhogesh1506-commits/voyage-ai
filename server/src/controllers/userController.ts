import {
  Request,
  Response,
} from "express";

import User from "../models/User";

// Get logged-in user
export const getUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId =
      (req as any).userId;

    const user =
      await User.findById(
        userId
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt:
          user.createdAt,
        lastLogin:
          user.lastLogin,
        loginCount:
          user.loginCount || 0,
      },
    });
  } catch (error) {
    console.error(
      "GET USER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "User fetch failed",
    });
  }
};

// Update logged-in user
export const updateUser =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        (req as any).userId;

      const {
        name,
      } = req.body;

      if (
        !name ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Name is required",
        });
      }

      if (
        name.trim().length < 2
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Name must contain at least 2 characters",
        });
      }

      if (
        name.trim().length > 60
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Name cannot exceed 60 characters",
        });
      }

      const user =
        await User.findByIdAndUpdate(
          userId,

          {
            name: name.trim(),
          },

          {
            new: true,
            runValidators: true,
          }
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt:
            user.createdAt,
          lastLogin:
            user.lastLogin,
          loginCount:
            user.loginCount || 0,
        },
      });
    } catch (error) {
      console.error(
        "UPDATE USER ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Profile update failed",
      });
    }
  };