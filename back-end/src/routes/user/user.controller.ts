import { Request, Response } from 'express';

import { RESULT, ERROR_VI } from '../../types/enum';
import { Controller } from '../../types/interface';
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../../errors';

import { User } from '../../models';
import * as Utils from '../../utils';
import { RegisterDto, UpdateDto } from './user.dto';
import { requireAuth, checkAdmin } from '../../middlewares';


export const userControllers: Controller = {
    // GET Request
    me: [
        requireAuth,
        async (req: Request, res: Response) => {
            res.send({
                result: RESULT.success,
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

            res.send({
                result: RESULT.success,
                user: thatUser,
                token: token,
            });
        }
    ],

    getOne: [
        checkAdmin,
        async (req: Request, res: Response) => {
            const id: string = req.params.id;

            if (!id) throw new BadRequestError();

            const thatUser = await User.findById(id);

            res.send({
                result: RESULT.success,
                user: thatUser,
            })
        }
    ],

    getAll: [
        checkAdmin,
        async (req: Request, res: Response) => {
            const allUsers = await User.find();

            res.send({
                result: RESULT.success,
                users: allUsers,
            })
        }
    ],


    // POST Request
    signUp: [
        async (req: Request, res: Response) => {
            const { email, password, username } : RegisterDto = req.body;
            if (!email || !password || !username) throw new BadRequestError();
        
            const conflict = await User.findOne({ email });
            if (conflict != null) throw new ConflictError();
            
            const newUser = await User.create({ email, password, username });
        
            const token = Utils.token.gen({id: newUser._id, admin: newUser.admin});
        
            res.status(201).send({
                result: RESULT.success,
                user: newUser,
                token: token,
            });
        }
    ],

    refreshToken: [
        async (req: Request, res: Response) => {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken) throw new BadRequestError();
        
            const thatUser = await User.findOne({ refreshToken });
            if (thatUser === null) throw new NotFoundError();
                    
            const token = Utils.token.gen({id: thatUser._id, admin: thatUser.admin});
            const newRefreshToken = Utils.token.newRefreshToken();
        
            res.send({
                result: RESULT.success,
                token: token,
                refreshToken: newRefreshToken,
            });
        }
    ],


    // Update
    update: [
        requireAuth,
        async (req: Request, res: Response) => {
            const { password, username } : UpdateDto = req.body;
            if (!password && !username) throw new BadRequestError();
        
            const currentUser = await User.findById(req.user!.id);
            if (!currentUser) throw new NotFoundError();

            if (password) currentUser!.password = password;
            if (username) currentUser!.username = username;

            currentUser.save();

            res.send({
                result: RESULT.success,
                user: currentUser,
            });
        }
    ],
}
