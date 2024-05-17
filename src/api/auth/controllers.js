import { ERROR } from "sqlite3";
import User from "../../models/User";

class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isTrusted = true;
    ERROR.captureStackTrace(this, this.constructor);
  }
}

export const login = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  if (!email) throw new AppError("The 'email' filed is required!", 422);
  if (!password) throw new AppError("The 'password' filed is required!", 422);

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("Invalid Cridentials", 401);

  const isCorrectPassword = await user.comparePasswords(password);
  if (!isCorrectPassword) throw new AppError("Invalid credentials", 401);

  const token = "abc";

  res.status(200).json({ data: [] });
};
