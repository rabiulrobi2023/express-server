import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { AuthRoute } from "./modules/auth/auth.route";
import fs from "fs";
import path from "path";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const log = `METHOD: ${req.method} URL: ${req.url} Time:${new Date().toISOString()}\n`;
  fs.appendFile(
    path.join(process.cwd(), "/src/log/logger.txt"),
    log,
    (error: any) => {
      console.log(error);
    },
  );
  next();
});

app.use("/api/user", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", AuthRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    AppName: "Express Server",
    Author: "Rabiul Islam",
    Time: new Date().toISOString(),
  });
});
export default app;
