import express from "express";
import cors from "cors";
import AppDataSource from "./data-source";
import productRouter from './routes/ProductRoutes';
import userRouter from "./routes/UserRoutes";


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
