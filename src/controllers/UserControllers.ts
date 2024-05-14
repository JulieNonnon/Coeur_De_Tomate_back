import { Request, Response } from "express";
import { UserService } from "../services/UserServices";

export class UserController {

    private userService = new UserService();

    async signup(req : Request, res : Response) {
        
        console.log("UserController: Signup")
        const { name, email, password } = req.body;
        // const email = req.body.email;
        // const password = req.body.password;
        const createUser = await this.userService.signup(name, email, password)
    
        if(createUser) {
            res.status(201).json({message: "Utilisateur enregistré ✅"});
        } else {
            res.status(500).json({message: "L'enregistrement utilisateur n'a pas pu aboutir"});
        }
    
    }

    async login(req : Request, res : Response) {

        console.log("UserController: Login")
        const { email, password } = req.body;
        const token = await this.userService.login(email, password)
    
        if(token) {
            // Récupérer le nom de l'utilisateur
            const user = await this.userService.getUserByEmail(email);
            if (user) {
                res.status(201).json({message: `Utilisateur ${user.name} connecté ✅`});
            } else {
                res.status(500).json({message: "Impossible de récupérer les informations de l'utilisateur"});
            }
        } else {
            res.status(500).json({message: "La connexion utilisateur n'a pas pu aboutir"});    
        }
    }
}

export default UserController;