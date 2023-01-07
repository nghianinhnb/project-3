import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { BadRequestError } from '../../errors';


export const catchValidateError = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const messages = errors.array().map(e => e.msg)
        throw new BadRequestError(messages);
    }

    next();
};
