import express from "express";
import cors from "cors";
import multer from "multer";
import AppDataSource from "./data-source";
import productRouter from './routes/ProductRoutes';
import userRouter from "./routes/UserRoutes";
import path from "path";


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
        app.use("/api/products", productRouter); // Route initiale de productRouter (ce qui s'inscrit après localhost):
        app.use("/api/users", userRouter);

        app.listen(process.env.PORT, () => {
            console.log(`Api Server is running on port: ${process.env.PORT}`);
            });
    })

    .catch((err) => {
        console.log(`An error occured :`, err);
      });
