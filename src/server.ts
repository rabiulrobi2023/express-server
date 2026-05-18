import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";

const app: Application = express();
const port: number = Number(config.PORT);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: config.NEON_CONNECTING_STRING,
});

const initDB = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20) NOT NULL,
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
initDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is Express Server",
    author: "Rabiul Islam",
  });
});

app.post("/api/user", async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *`,
      [name, email, password, age],
    );

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
});

app.get("/api/user", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    res.status(201).json({
      status: true,
      message: "User retrived Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
});

app.get("/api/user/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1 `, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({
        status: false,
        message: "User not found",
        data: result.rows[0],
      });
    }
    res.status(201).json({
      status: true,
      message: "User retrived Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
});

app.put("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, password, is_active } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET
      name=COALESCE ($1, name),
      age=COALESCE ($2, age), 
      password = COALESCE ($3, password), 
      is_active= COALESCE($4, is_active)
    WHERE id= $5 RETURNING *`,
      [name, age, password, is_active, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        status: false,
        message: "User not found",
        data: {},
      });
    }

    res.status(200).json({
      status: false,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
});

app.delete("/api/user/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        status: false,
        message: "User not found",
        data: {},
      });
    }
    res.status(200).json({
      status: false,
      message: "User deleted successfully",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
