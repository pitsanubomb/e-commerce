import * as express from "express";
import UserController from "../controller/userconttroller";
import AuthJwt from "../middlewares/auth";

const app = express();
app.use(express.json());
app.post("/register", UserController.register);
app.post("/login", UserController.auth);

app.get("/me", [AuthJwt.checkAuth], UserController.getme);
app.patch("/me", [AuthJwt.checkAuth], UserController.changepass);

app.get("/all", [AuthJwt.checkAuth, AuthJwt.isAdmin], UserController.getuserall);

app.get("/:id([0-9]+)", [AuthJwt.checkAuth, AuthJwt.isAdmin], UserController.getOneById);
app.put("/:id([0-9]+)", [AuthJwt.checkAuth, AuthJwt.isAdmin], UserController.edituser);
app.delete("/:id([0-9]+)", [AuthJwt.checkAuth, AuthJwt.isAdmin], UserController.deluser);

app.get("/me/order", [AuthJwt.checkAuth], UserController.getorderhistory);

export default app;
