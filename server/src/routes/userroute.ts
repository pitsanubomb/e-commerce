import * as express from "express";
import UserController from "../controller/userconttroller";
import AuthJwt from "../middlewares/auth";

const app = express();
app.use(express.json());
app.post("/register", UserController.register);
app.post("/login", UserController.auth);

app.get("/me", [AuthJwt.checkAuth], UserController.getme);
app.patch("/me", [AuthJwt.checkAuth], UserController.changepass);

app.get("/all", [AuthJwt.checkAuth], UserController.getuserall);

app.get("/:id([0-9]+)", [AuthJwt.checkAuth], UserController.getOneById);
app.put("/:id([0-9]+)", [AuthJwt.checkAuth], UserController.edituser);
app.delete("/:id([0-9]+)", [AuthJwt.checkAuth], UserController.deluser);

app.get("/me/order", [AuthJwt.checkAuth], UserController.getorderhistory);

export default app;
