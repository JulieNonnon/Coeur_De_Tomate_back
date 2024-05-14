import { Router } from "express";
import UserController from "../controllers/UserControllers";


const userRouter = Router();
const userController = new UserController();

//Route inscription
userRouter.post("/signup", (req,res) => {
    console.log("UserRouter: Signup");
    userController.signup(req, res);
});

//Route connexion : on fait un Post pour vérifier que l'utilisateur vérifie si il existe
userRouter.post("/login", (req,res) => {
    console.log("UserRouter: Login");
    userController.login(req, res);
});


export default userRouter;