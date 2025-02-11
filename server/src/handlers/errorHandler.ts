// server/src/handlers/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('에러 발생:', err);
    res.status(500).json({ error: err.message });
};
