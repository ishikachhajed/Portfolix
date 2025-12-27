import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import Portfolio from "../models/Portfolio.model.js";

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
