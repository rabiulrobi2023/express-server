import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.NEON_CONNECTING_STRING,
});

export const initDB = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id INT GENERATED ALWAYS AS IDENTITY (START WITH 1001) PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      email VARCHAR(30) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      is_active BOOLEAN DEFAULT true,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS profiles (
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        address TEXT,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()

        )`);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
