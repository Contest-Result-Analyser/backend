import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Kein Token vorhanden" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).userId = (decoded as any).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Ungültiges Token" });
  }
};