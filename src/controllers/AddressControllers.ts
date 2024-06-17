import { Request, Response } from "express";
import AddressService from "../services/AddressServices";

class AddressController {

    private addressService = new AddressService();

    async getById(req: Request, res: Response) {
        try {
            const addressId = Number(req.params.id);
            if (isNaN(addressId)) {
                res.status(400).send({ status: "Failed getById", message: "Invalid address ID" });
                return;
            }
            const oneAddress = await this.addressService.getById(Number(req.params.id));
            res.send({ status: "ok", data: oneAddress });
        } catch (error) {
            res.status(500).send({ status: "Failed getById", message: error })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const newAddress = await this.addressService.create(req.body);
            res.send({ status: "ok", data: newAddress });
        } catch (error) {
            res.status(500).send({ status: "Failed create", message: error})
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedAddress = await this.addressService.update(req.params.id, req.body);
            res.send({ status: "ok", data: updatedAddress });
        } catch (error) {
            res.status(500).send({ status: "Failed update", message: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const deletedAddress = await this.addressService.delete(req.params.id);
            res.send({status: "ok", data: deletedAddress });
        } catch (error) {
            res.status(500).send({ status: "Failed delete", message: error});
        }
    }

}

export default AddressController;