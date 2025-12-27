import { signupService } from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
