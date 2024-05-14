import { Request, Response } from "express";
import { UserService } from "../services/UserServices";

export class UserController {

    private userService = new UserService();

    async signup(req : Request, res : Response) {
        
        console.log("UserController")
        const { email, password } = req.body;
        // const email = req.body.email;
        // const password = req.body.password;
        const createUser = await this.userService.signup(email, password)
    
        if(createUser) {
            res.status(201).json({});
        } else {
            res.status(500).json({});
        }
    
    }

    async login(req : Request, res : Response) {

        console.log("UserController Login")
        const { email, password } = req.body;
        const token = await this.userService.login(email, password)
    
        if(token) {
            res.status(201).json({});
        } else {
            res.status(500).json({});
        }

    }
}

export default UserController;