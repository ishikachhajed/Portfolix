import { signupService, loginService } from "../services/auth.service.js";

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

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json({
      message: "Login successful",
      token: result.token,
      userId: result.userId,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
