import bcrypt from "bcrypt";
import { pool } from "../../db";
import jwt, { type SignOptions } from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const result = await pool.query(
    `
        SELECT * 
        FROM users
        WHERE 
        email = $1
        `,
    [payload.email],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("User not exitsts");
  }

  const isMatchPassword = await bcrypt.compare(payload.password, user.password);
  if (!isMatchPassword) {
    throw new Error("The password is incorrect");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.JWT_ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
    } as SignOptions,
  );
  return {
    accessToken,
  };
};

export const AuthService = {
  loginUserIntoDB,
};
