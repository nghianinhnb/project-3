import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ValidationChain } from 'express-validator'


export type RequestPromiseHandler = ValidationChain | RequestHandler


/**
 * Turn a sync middleware or an array of middleware to async
 */
function asyncMiddleware(func: RequestPromiseHandler | RequestPromiseHandler[]) {
    return (req: Request, res: Response, next: NextFunction) => {

        if (Array.isArray(func)) {
            return new Promise<void>(async (resolve) => {
                for (const f of func) {
                    await asyncMiddleware(f)(req, res, next)
                }
                return resolve()
            }).then(() => next())
        }

        return Promise.resolve((func as RequestHandler)(req, res, next))
    }
}


export {
    asyncMiddleware,
}
