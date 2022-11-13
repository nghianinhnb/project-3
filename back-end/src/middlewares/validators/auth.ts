import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { CONFIG } from '../../initialize/config';
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

export const auth = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization && req.headers.authorization.match(/^Bearer (.*)$/);
    if (!token || !token[1]) throw new UnauthorizedError();

    let jwt_payload = token[1];

    try {
        const payload = jwt.verify(
            jwt_payload,
            CONFIG.SECRETS.JWT_KEY
        ) as UserPayload;
            
        req.user = payload;

    } catch (err) {
        throw new UnauthorizedError()
    }

    next()
};
