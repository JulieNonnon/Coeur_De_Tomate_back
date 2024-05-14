import bcrypt from "bcrypt";
import AppDataSource from "../data-source";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";


export class UserService {

    private userRepository = AppDataSource.getRepository(User); 
    // typeorm (les orm en général) nous permet d'éviter d'écrire les requetes sql

    //Création de compte / Signup
    async signup(email: string, password : string) {
        console.log("UserService: Signup")
     
        // 1) Hashage mdp avec bcrypt x10
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2) Création nouvel utilisateur, avec email et mdp hashé
        const newUser = this.userRepository.create({
            email : email, 
            password : hashedPassword
        });
    
        // 3) Sauvegarde du user qui vient d'être créé
        return await this.userRepository.save(newUser); 
        
    }

    //Connexion / Login (POST puis comparaison si user existant)
    async login(email: string, password : string) {
        console.log("UserService: Login")

        // Recherche du user dans la bdd avec son email
        const user = await this.userRepository.findOneBy({email : email});

        // Vérification si user existe dans la bdd, sinon retourne null
        if (!user) {
            return null;
        }

        // Vérification de la validité du mdp en comparant le mdp hashé avec celui fourni
        const isPasswordValid = await bcrypt.compare(password, user.password || '');

        // Si le mdp n'est pas valide, retourne null
        if (!isPasswordValid) {
            return null;
        } 

        // Creation du token JWT, contenant l'identifiant id et l'email du user
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: "4h"});

        return token;
        
        // Comment faire apparaitre le token dans le retour du login dans Postman ?
    }
}
export default UserService;