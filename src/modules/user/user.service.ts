import config from "../../config";
import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password } = payload;
  const hashPassword = await bcrypt.hash(password, Number(config.BCRYPT_SALT));
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password) 
    VALUES($1,$2,$3) 
    RETURNING *
    `,
    [name, email, hashPassword],
  );

  delete result.rows[0].password;
  delete result.rows[0].is_active;

  return result;
};

const getAllUserFromDB = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    `,
  );

  result.rows.forEach((user) => {
    delete user.password;
    delete user.is_active;
  });

  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id = $1 
    `,
    [id],
  );

  delete result.rows[0].password;
  delete result.rows[0].is_active;
  return result;
};

const updateUserFromDB = async (id: number, payload: Partial<IUser>) => {
  const { name, password, is_active } = payload;

  const result = await pool.query(
    `
    UPDATE users
    SET
      name=COALESCE ($1, name),
      password = COALESCE ($2, password), 
      is_active= COALESCE($3, is_active)
    WHERE
    id= $5
    RETURNING *
    `,
    [name, password, is_active, id],
  );

  return result;
};

const deleteUserFromDB = async (id: number) => {
  const result = await pool.query(
    `
    DELETE
    FROM users
    WHERE
    id = $1
    `,
    [id],
  );
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
