import { Product } from "./../entity/Product";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
class ProductController {
  static create = async (req: Request, res: Response) => {
    const repo = getRepository(Product);
    try {
      const product = repo.create(req.body);
      await repo.save(req.body);
      res.send({ message: "Save success", data: product });
    } catch (error) {
      res.status(500).send({ message: "Save fail", error: error });
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    const repo = getRepository(Product);
    try {
      const product = await repo.findOneOrFail(id);
      res.send({ message: "Fetch success", data: product });
    } catch (error) {
      res.status(404).send({
        message: "Product not found",
        error: error,
      });
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

  static editproduct = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const repo = getRepository(Product);
    try {
      let productToUpdate = await repo.findOneOrFail(id);
      productToUpdate.name = req.body.name;
      productToUpdate.detail = req.body.detail;
      productToUpdate.imgcover = req.body.imgcover;
      productToUpdate.prize = req.body.prize;
      productToUpdate.count = req.body.count;
      productToUpdate.isShipping = req.body.isShipping;
      await repo.save(productToUpdate);
      res.status(200).send({
        message: "Update product success",
      });
    } catch (error) {
      res.status(500).send({
        message: "Can't Edit Product",
        error: error,
      });
    }
  };

  static delproduct = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const repo = getRepository(Product);
    const productDel = await repo.findOneOrFail(id);
    try {
      await repo.remove(productDel);
      res.status(200).send({
        message: "Delete product success",
      });
    } catch (error) {
      res.status(500).send({
        message: "Can't Delete product",
        error: error,
      });
    }
  };
}
export default ProductController;
