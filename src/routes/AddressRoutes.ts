import { Router } from "express";
import AddressController from "../controllers/AddressControllers";

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.get("/:id", (req, res) => {
    console.log("addressRouter: GetById👌")
    addressController.getById(req, res);
});

addressRouter.post("/", (req,res) => {
    console.log("addressRouter: Create👌")
    addressController.create(req, res);
});

addressRouter.put("/:id", (req, res) => {
    console.log("addressRouter: Update👌")
    addressController.update(req, res);
});

addressRouter.delete("/:id", (req, res) => {
    console.log("addressRouter: Delete👌")
    addressController.delete(req,res);
});

export default addressRouter;