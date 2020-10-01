import { User } from "./../entity/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";

class UserController {
  static register = async (req: Request, res: Response) => {
    const repo = getRepository(User);
    let user: User;
    if (req.body.isAdmin === true) {
      user = repo.create({
        username: req.body.username,
        password:
          Buffer.from(req.body.password).toString("base64") + "secretpass",
        isAdmin: true
      });
    } else {
      user = repo.create({
        username: req.body.username,
        password:
          Buffer.from(req.body.password).toString("base64") + "secretpass",
      });
    }
    const resData = await repo
      .save(user)
      .then((d: User) => {
        return {
          message: "Register complete",
          data: {
            user: d.username,
            isAdmin: d.isAdmin
          },
        };
      })
      .catch((eror: any) => eror);
    if (resData.severity) {
      res.status(400).send({
        message: "ไม่สามารถสมัครสมาชิกได้ ",
        error: {
          code: resData.code,
          errormessage: resData.message,
          detail: resData.detail,
        },
      });
      return;
    }
    return res.status(201).send(resData);
  };

  static auth = async (req: Request, res: Response) => {
    const repo = getRepository(User);
    let user: User;
    try {
      user = await repo.findOne({
        username: req.body.username,
        password:
          Buffer.from(req.body.password).toString("base64") + "secretpass",
      });
    } catch (error) {
      res.status(400).send({
        message: "ไม่สามารถเข้าสู้ระบบได้",
        error: error,
      });
    }
    if (!user) {
      res.status(400).send({
        error: "ไม่สามารถเข้าสู้ระบบได้เนื่องจาก Username or Password ผิด",
      });
      return;
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.isAdmin },
      "secretis1234",
      {
        expiresIn: "1d",
      }
    );
    res.send({
      message: "login success",
      data: {
        token: token,
        isAdmin: user.isAdmin
      },
    });
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "isAdmin"],
      });
      res.send({ message: "Fetch success", data: user });
    } catch (error) {
      res.status(404).send({
        message: "User not found",
        error: error,
      });
    }
  };

  static getuserall = async (req: Request, res: Response) => {
    const repo = getRepository(User);
    try {
      const users = await repo.find({
        select: ["id", "username"], //We dont want to send the passwords on response
      });

      res.send({
        message: "Fetch success",
        data: {
          user: users,
        },
      });
    } catch (error) {
      res.status(404).send({
        message: "User not found",
        error: error,
      });
    }
  };

  static getme = async (req: Request, res: Response) => {
    const me = res.locals.isAuth;
    res.send({
      message: "Fetch success",
      data: {
        user: {
          id: me.id,
          username: me.username,
        },
      },
    });
  };

  static changepass = async (req: Request, res: Response) => {
    const repo = getRepository(User);
    const meId = res.locals.isAuth.id;

    try {
      let me = await repo.findOneOrFail(meId);
      me.password =
        Buffer.from(req.body.password).toString("base64") + "secretpass";
      await repo.save(me);
      res.send({ message: "Change password success" });
    } catch (error) {
      res.status(500).send({
        message: "Can't change password",
        error: error,
      });
    }
  };

  static edituser = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const repo = getRepository(User);
    try {
      let userToUpdate = await repo.findOneOrFail(id);
      userToUpdate.username = req.body.username;
      if (req.body.password || req.body.password !== null || req.body.password !== undefined) {
        userToUpdate.password =
          Buffer.from(req.body.password).toString("base64") + "secretpass"
      };
      userToUpdate.isAdmin = req.body.isAdmin;
      await repo.save(userToUpdate);
      res.status(200).send({
        message: "Update user success",
      });
    } catch (error) {
      res.status(500).send({
        message: "Can't Edit user",
        error: error,
      });
    }
  };

  static deluser = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const repo = getRepository(User);
    const userDel = await repo.findOneOrFail(id);
    try {
      await repo.remove(userDel);
      res.status(200).send({
        message: "Delete user success",
      });
    } catch (error) {
      res.status(500).send({
        message: "Can't Delete user",
        error: error,
      });
    }
  };

  static getorderhistory = async (req: Request, res: Response) => {
    const repo = getRepository(User);
    try {
      const order = await repo.findOneOrFail(res.locals.isAuth.id, {
        relations: ["orders", "orders.products"],
      });
      res.send({
        message: "History found",
        data: order,
      });
    } catch (error) {
      res.status(400).send({
        message: "History not found",
        error: error,
      });
    }
  };
}

export default UserController;
