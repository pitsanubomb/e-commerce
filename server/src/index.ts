import { createConnection, Connection } from "typeorm";
import * as express from "express";
import userRoute from "./routes/userroute";
import productRoute from "./routes/productroute";
import orderRoute from "./routes/orderroute";

createConnection()
  .then(async (connection) => {
    const app = express();

    app.use(express.json());

    app.use("/api/user", userRoute);
    app.use("/api/product", productRoute);
    app.use("/api/order", orderRoute);

    app.listen(3000, () => {
      console.info("Server is start . . .");
    });
  })
  .catch((e) => console.warn(e));
