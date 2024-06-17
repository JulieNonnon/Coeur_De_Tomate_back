import { Router } from "express";
import UserController from "../controllers/UserControllers";


const userRouter = Router();
const userController = new UserController();


// const checkAuth = (req, res, next) => {
//     if (req.session.userId) {
//       next();
//     } else {
//       res.status(401).send('Vous devez être connecté pour accéder à cette page');
//     }
//   };

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

// // Route pour accéder au profil de l'utilisateur
// userRouter.get('/profile', checkAuth, (req, res) => {
//     console.log("UserRouter: Profile");
//     userController.profile(req, res);
//   });
  
  // Route pour la déconnexion
//   userRouter.post('/logout', (req, res) => {
//     console.log("UserRouter: Logout");
//     userController.logout(req, res);
//   });

export default userRouter;