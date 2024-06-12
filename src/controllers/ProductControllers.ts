import { Request, Response } from "express";
import ProductService from "../services/ProductServices";


class ProductController{

    private productService = new ProductService();

    async getAll(req: Request, res: Response) {
        try {
            const products = await this.productService.getAll();
            console.log('hello', products);
            res.send({ status: "ok", data: products });
        } catch (error) {
            res.send(500).send({ status: "Failed getAll", message: error });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const productId = Number(req.params.id);
            if (isNaN(productId)) {
                res.status(400).send({ status: "Failed getById", message: "Invalid product ID" });
                return;
            }
            const oneProduct = await this.productService.getById(Number(req.params.id));
            res.send({ status: "ok", data: oneProduct });
        } catch (error) {
            res.status(500).send({ status: "Failed getById", message: error })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const newProduct = await this.productService.create(req.body);
            res.send({ status: "ok", data: newProduct });
        } catch (error) {
            res.status(500).send({ status: "Failed create", message: error})
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedProduct = await this.productService.update(req.params.id, req.body);
            res.send({ status: "ok", data: updatedProduct });
        } catch (error) {
            res.status(500).send({ status: "Failed update", message: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const deletedProduct = await this.productService.delete(req.params.id);
            res.send({status: "ok", data: deletedProduct });
        } catch (error) {
            res.status(500).send({ status: "Failed delete", message: error});
        }
    }

    async getLast(req: Request, res: Response) {
        try {
            const lastProduct = await this.productService.getLastProduct();
            res.send({ status: "ok", data: lastProduct });
        } catch (error) {
            res.status(500).send({ status: "Failed getLast", message: error })
        }
    }
}

export default ProductController;