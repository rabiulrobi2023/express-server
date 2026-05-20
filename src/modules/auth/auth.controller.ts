import type { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUserIntoDB(req.body);

    res.status(200).json({
      status: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
};

export const AuthController = {
  loginUser,
};
