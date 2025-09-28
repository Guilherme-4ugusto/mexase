import { Request, Response, NextFunction  } from 'express';
import jwt from 'jsonwebtoken';

export const validarJWT = async (req: Request, res: Response, next: NextFunction ) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    if(!token.match('Bearer ')){
        return res.status(403).json({ message: "Token inválido." });
    }
  
    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) return res.status(403).json({ message: "Token inválido." });

        res.locals.token = decoded;
        return next();
    } catch (error: any) {
        if(error.message === "invalid signature"){
            return res.status(403).json({ error: "Token inválido" });
        } else if (error.message === "jwt expired"){
            return res.status(403).json({ error: "Token expirado" })
        }
        return res.status(403).json({ error: error.message });
    }
}