import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// le middleware va vérifier s'il y a un token dans le header, permet de protéger les routes

const checkToken = (req: Request, res: Response, next: NextFunction) => {
    // nextFunction: si tu passes par là, va a la suite

    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({ message: "Unauthorized"});
    }

    const tokenVerify = token.replace("Bearer ", "");

    try {
        jwt.verify(tokenVerify, process.env.JWT_SECRET as string);
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized"});
    }

    next(); 

};

export default checkToken;