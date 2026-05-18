import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = () => {
  initDB();
  const port = Number(config.PORT);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
