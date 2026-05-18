import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  NEON_CONNECTING_STRING: process.env.NEON_CONNECTING_STRING as string,
  PORT: process.env.PORT,
};

export default config;
