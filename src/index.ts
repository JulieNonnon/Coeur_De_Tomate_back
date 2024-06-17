import express from "express";
import cors from "cors";
import session from "express-session";
import pgSession from "connect-pg-simple";
import AppDataSource from "./data-source";
import productRouter from './routes/ProductRoutes';
import userRouter from "./routes/UserRoutes";
import dotenv from "dotenv";
//import path from "path";
//import multer from "multer";

dotenv.config({ path: ".env.local" });

//initialisation de l'orm
AppDataSource.initialize()
    .then(() => {
        const app = express(); // disponibilité des éléments d'express
    
        app.use(express.json());
        app.use(cors( // autorisation accès au back
                {
                    origin:"*", // équivalent de 'http://localhost:3000' 
                    methods: ["GET", "POST", "PUT", "DELETE"], // méthodes pour requètes CRUD
                }
            ));

        // // Configuration de Multer pour l'upload de fichiers
        // const storage = multer.diskStorage({
        //     destination: (req, file, cb) => {
        //         cb(null, path.join(__dirname, "uploads")); // Spécifier le dossier de destination des fichiers uploadés
        //     },
        //     filename: (req, file, cb) => {
        //         cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier avec un timestamp pour éviter les collisions de noms
        //     }
        // });

        // const upload = multer({ storage: storage });

        // // Utilisation de Multer pour les routes nécessitant l'upload de fichiers
        // app.post("/api/products", upload.single("image"), (req, res) => {
        //     // Traitement des données et du fichier uploadé ici
        // });

        // définir les routes des entitées une fois créées
        
        // Configuration des sessions
    app.use(session({
        store: new (pgSession(session))({
          conObject: {
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
          }
        }),
        secret: 'yourSecretKey',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 180 * 60 * 1000 } // 3 heures
      }));
        
        app.use("/api/products", productRouter); // Route initiale de productRouter (ce qui s'inscrit après localhost):
        app.use("/api/users", userRouter);

        app.listen(process.env.PORT, () => {
            console.log(`Api Server is running on port: ${process.env.PORT}`);
            });
    })

    .catch((err) => {
        console.log(`An error occured :`, err);
      });
