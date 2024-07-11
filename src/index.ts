import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppDataSource from "./data-source";
import productRouter from './routes/ProductRoutes';
import userRouter from "./routes/UserRoutes";
import addressRouter from "./routes/AddressRoutes";
import session from "express-session";
import pgSession from "connect-pg-simple";

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
        app.use("/api/addresses", addressRouter);

        app.listen(process.env.PORT, () => {
            console.log(`Api Server is running on port: ${process.env.PORT}`);
            });
    })

    .catch((err) => {
        console.log(`An error occured :`, err);
      });
