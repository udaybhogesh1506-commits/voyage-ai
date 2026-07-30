import {
  Request,
  Response,
} from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";

// Register user
export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Name, email and password are required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const adminEmail =
      process.env.ADMIN_EMAIL
        ?.trim()
        .toLowerCase();

    const userRole =
      normalizedEmail === adminEmail
        ? "admin"
        : "user";

    const user =
      await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: userRole,
      });

    return res.status(201).json({
      message:
        "User registered successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// Login user
export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await User.findOne({
        email: normalizedEmail,
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message:
          "Invalid password",
      });
    }

    const adminEmail =
      process.env.ADMIN_EMAIL
        ?.trim()
        .toLowerCase();

    const userRole =
      normalizedEmail === adminEmail
        ? "admin"
        : "user";

    user.role = userRole;
    user.lastLogin = new Date();
    user.loginCount =
      (user.loginCount || 0) + 1;

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      message:
        "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin:
          user.lastLogin,
        loginCount:
          user.loginCount,
      },
    });
  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
};