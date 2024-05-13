import { DataSource } from "typeorm";
// ou ajoute les variables d'environnement et lui donner le chemin de notre fichier:
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

//créer le app data-source, il va chercher toutes les données de notre app (la bdd)
const AppDataSource = new DataSource ({

    //connexion bdd
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});

export default AppDataSource;