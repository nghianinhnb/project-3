import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { BaseHttpError } from "../errors";
import { ERROR_VI } from '../types/enum';


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseHttpError) return res.status(err.statusCode).send(err.respond());

    console.error(err);

    res.status(500).send({
        message: ERROR_VI.INTERNAL_ERROR,
    })
}
