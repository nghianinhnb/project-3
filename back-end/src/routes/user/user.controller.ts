import { Request, Response } from 'express';

import { ERROR_VI } from '../../types/enum';
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../../errors';

import { User } from '../../models';
import * as Utils from '../../shared/utils';
import { RegisterDto, UpdateDto } from './user.dto';
import { requireAuth, checkAdmin } from '../../middlewares';


export const userControllers = {
    me: [
        requireAuth,
        async (req: Request, res: Response) => {
            res.send({
                user: req.user,
            })
        }
    ],

    signIn: [
        async (req: Request, res: Response) => {
            const { email, password } : RegisterDto = req.body;
            if (!email || !password) throw new BadRequestError();

            const thatUser = await User.findOne({email});
            
            if (
                thatUser === null ||
                ! await Utils.password.compare(thatUser.password, password)
            ) 
            throw new UnauthorizedError();

            const token = Utils.token.gen({id: thatUser._id, admin: thatUser.admin});

            req.session = {
                jwt: token
            };
          
            res.send(thatUser);
        }
    ],

    signUp: [
        async (req: Request, res: Response) => {
            const { email, password } = req.body;
            if (!email || !password) throw new BadRequestError();
        
            const conflict = await User.findOne({ email });
            if (conflict != null) throw new ConflictError();
            
            const newUser = await User.create({ email, password });
        
            const token = Utils.token.gen({id: newUser._id, admin: newUser.admin});

            req.session = {
                jwt: token
            };

            res.status(201).send(newUser);
        }
    ],

    signOut: async (req: Request, res: Response) => {
        req.session = null;
        res.status(204).end();
    },

    refreshToken: [
        async (req: Request, res: Response) => {
            const refreshToken = req.session?.refreshToken;
            if (refreshToken) throw new UnauthorizedError();

            const thatUser = await User.findOne({ refreshToken });
            if (thatUser === null) throw new NotFoundError();

            const token = Utils.token.gen({id: thatUser._id, admin: thatUser.admin});
            const newRefreshToken = Utils.token.newRefreshToken();

            req.session = {
                jwt: token,
                refreshToken: newRefreshToken,
            };

            res.status(204).end();
        }
    ],


    // Update
    update: [
        requireAuth,
        async (req: Request, res: Response) => {
            const { password } : UpdateDto = req.body;
            if (!password) throw new BadRequestError();
        
            const currentUser = await User.findById(req.user!.id);
            if (!currentUser) throw new NotFoundError();

            if (password) currentUser!.password = password;

            currentUser.save();

            res.send({
                user: currentUser,
            });
        }
    ],
}
