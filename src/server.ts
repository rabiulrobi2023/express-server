import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();
const prot: number = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(prot, () => {
  console.log(`Example app listening on port ${prot}`);
});
