import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  NEON_CONNECTING_STRING: process.env.NEON_CONNECTING_STRING as string,
  PORT: process.env.PORT,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || ""
};

export default config;
