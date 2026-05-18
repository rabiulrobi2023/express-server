import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;
  const result = await pool.query(
    `INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, email, password, age],
  );
  return result;
};

const getAllUserFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1 `, [id]);
  return result;
};

const updateUserFromDB = async (id: number, payload: Partial<IUser>) => {
  const { name, age, password, is_active } = payload;

  const result = await pool.query(
    `UPDATE users SET
      name=COALESCE ($1, name),
      age=COALESCE ($2, age), 
      password = COALESCE ($3, password), 
      is_active= COALESCE($4, is_active)
    WHERE id= $5 RETURNING *`,
    [name, age, password, is_active, id],
  );

  return result;
};

const deleteUserFromDB = async (id: number) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB
};
