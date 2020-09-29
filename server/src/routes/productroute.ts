import * as express from "express";
import AuthJwt from "../middlewares/auth";
import ProductController from "../controller/productcontroller";

const app = express();
app.use(express.json());

app.post("/add", [AuthJwt.checkAuth, AuthJwt.isAdmin], ProductController.create);
app.get("/all", ProductController.getall);

export default app;
