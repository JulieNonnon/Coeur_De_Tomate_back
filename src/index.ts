import express from "express";
import cors from "cors";
import AppDataSource from "./data-source";

//initialisation de l'orm
AppDataSource.initialize()
    .then(() => {
        const app = express(); // disponibilité des éléments d'express
    
        app.use(express.json());
        app.use(
            cors( // autorisation accès au back
                {
                    origin:"*", // équivalent de 'http://localhost:3000' 
                    methods: ["GET", "POST", "PUT", "DELETE"], // méthodes pour requètes CRUD
                }
            )
        );

        // >>>> Définir les routes des entitées une fois créées
    
        app.listen(process.env.PORT, () => {
            console.log(`Api Server is running on port: ${process.env.PORT}`);
            });
    })

    .catch((err) => {
        console.log(`Une erreur s'est produite :`, err);
      });
