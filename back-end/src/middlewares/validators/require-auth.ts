import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import cookieSession from 'cookie-session';

import { UnauthorizedError } from '../../errors';


interface UserPayload {
    id: string;
    email: string;
    admin?: boolean;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) throw new UnauthorizedError();

    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        ) as UserPayload;
        req.user = payload;
    } catch (err) {
        throw new UnauthorizedError();
    }

    next();
};
