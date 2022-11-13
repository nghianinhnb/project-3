import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../../errors';


export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.admin) {
    throw new ForbiddenError();
  }

  next();
};
