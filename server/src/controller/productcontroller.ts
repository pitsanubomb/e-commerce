import { Product } from "./../entity/Product";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
class ProductController {
  static create = async (req: Request, res: Response) => {
    const repo = getRepository(Product);
    try {
      const product = await repo.create(req.body);
      await repo.save(req.body);
      res.send({ message: "Save success", data: product });
    } catch (error) {
      res.status(500).send({ message: "Save fail", error: error });
    }
  };

  static getall = async (req: Request, res: Response) => {
    const repo = getRepository(Product);
    try {
      const product = await repo.find();
      res.send({ message: "Find product all success", data: product });
    } catch (error) {
      res.status(404).send({ message: "Not have products", error: error });
    }
  };
}
export default ProductController;
