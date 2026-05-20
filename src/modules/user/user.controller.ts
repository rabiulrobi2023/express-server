import type { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUserIntoDB(req.body);
    return res.status(201).json({
      status: true,
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
    if (result.rows.length > 0) {
      return res.status(200).json({
        status: true,
        message: "User retrived Successfully",
        data: result.rows,
      });
    }

    return res.status(404).json({
      status: false,
      message: "There is no any user",
      data: {},
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await UserService.getSingleUserFromDB(Number(id));
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: result.rows[0],
      });
    }
    return res.status(200).json({
      status: true,
      message: "User retrived Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await UserService.updateUserFromDB(Number(id), req.body);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: {},
      });
    }

    return res.status(200).json({
      status: false,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await UserService.deleteUserFromDB(Number(id));
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: {},
      });
    }
    return res.status(200).json({
      status: false,
      message: "User deleted successfully",
      data: {},
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
};
export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
