import type { Request, Response } from "express";
import { ProfileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await ProfileService.createProfileIntoDB(req.body);
    res.status(201).json({
      status: true,
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
};
export const ProfileController = {
  createProfile,
};
