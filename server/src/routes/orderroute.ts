import * as express from "express";
import AuthJwt from "../middlewares/auth";
import OrderController from "../controller/ordercontroller";

const app = express();
app.use(express.json());

app.post("/create", [AuthJwt.checkAuth], OrderController.create);

app.get("/:id([0-9]+)", [AuthJwt.checkAuth], OrderController.getOneById);

export default app;
