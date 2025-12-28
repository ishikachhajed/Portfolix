import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Portfolio from "../models/Portfolio.model.js";

/* ================= SIGNUP ================= */

export const signupService = async (data) => {
  const { fullName, email, password, role } = data;

  if (!fullName || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    passwordHash,
    role,
  });

  await Portfolio.create({
    userId: user._id,
  });

  return user;
};

/* ================= LOGIN ================= */

export const loginService = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    userId: user._id,
  };
};
