import { User } from "./../entity/User";
import { Product } from "./../entity/Product";
import { Order } from "./../entity/Order";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class OrderController {
  static create = async (req: Request, res: Response) => {
    const repo = getRepository(Order);
    const userRepo = getRepository(User);
    const order = req.body;
    try {
      order.user = await userRepo.findOneOrFail(res.locals.isAuth.id);
      await repo.save(order);
      res.send({ message: "Save success", data: order });
    } catch (error) {
      res.status(500).send({
        message: "Order can't create",
        error: error,
      });
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    const repo = getRepository(Order);
    const id: any = req.params.id;
    try {
      const order = await repo.findOneOrFail(id, { relations: ["products","user"] });
      res.send(order);
    } catch (error) {
      res.status(400).send({
        message: "Order can't fond",
        error: error,
      });
    }
  };
}

export default OrderController;
