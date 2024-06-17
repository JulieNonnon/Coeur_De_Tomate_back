import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { Session, SessionData } from "express-session";

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

    // async login(req : Request, res : Response) {

    //     console.log("UserController: Login")
    //     const { email, password } = req.body;
    //     const user = await this.userService.login(email, password)
    
    //     if(user) {
            
    //             req.session.userId = user.id;
    //             res.status(201).json({message: `Utilisateur ${user.name} connecté ✅`});
    //         } else {
    //             res.status(500).json({message: "La connexion utilisateur n'a pas pu aboutir"});    
    //     }
    // }

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

    // async profile(req: Request, res: Response) {
    //     console.log("UserController: Profile");
    //     const user = await this.userService.getUserById(req.session.userId);
    
    //     if (user) {
    //       res.status(200).json({ user });
    //     } else {
    //       res.status(404).json({ message: "Utilisateur non trouvé" });
    //     }
    //   }

    //   logout(req: Request, res: Response) {
    //     console.log("UserController: Logout");
    //     req.session.destroy(err => {
    //       if (err) {
    //         return res.status(500).json({ message: "Erreur lors de la déconnexion" });
    //       }
    //       res.status(200).json({ message: "Déconnexion réussie" });
    //     });
    //   }
}

export default UserController;