import { Router } from "express";
import ProductController from "../controllers/ProductControllers";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/", (req, res) => {
    console.log("productRouter: GetAll👌")
    productController.getAll(req, res);
});

productRouter.get("/:id", (req, res) => {
    console.log("productRouter: GetById👌")
    productController.getById(req, res);
});

productRouter.post("/", (req,res) => {
    console.log("productRouter: Create👌")
    productController.create(req, res);
});

productRouter.put("/:id", (req, res) => {
    console.log("productRouter: Update👌")
    productController.update(req, res);
});

productRouter.delete("/:id", (req, res) => {
    console.log("productRouter: Delete👌")
    productController.delete(req,res);
});

productRouter.get("/last", (req, res) => {
    console.log("productRouter: GetLast👌")
    productController.getLast(req, res);
});

export default productRouter;