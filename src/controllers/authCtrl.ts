/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, Application, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as randomstring from 'randomstring';

// Middleware for time
import { dateNow } from '../middleware/time';

// Dotenv
import * as dotenv from 'dotenv';
dotenv.config();

// Validations
import {
    loginSchema, signupSchema
} from '../middleware/validation';

// Component
import {
    createAccount,
    fetchProfileByEmail,
    OmitPassword,
    validateEmail,
    validateUserPassword,
} from '../components/authComponent';
import { SignupReq } from '../datamodels/user.model';
import { AppConfig } from '../config/config';
import { LogError } from '../components/helperComponent';

// Token Secret
const tokenSecret: any = process.env.TOKEN_SECRET;

// login User
export const login = async (req: Request, res: Response) => {
    try {
        // Validate form
        await loginSchema.validateAsync(req.body);

        //check email login
        const user: any = await validateEmail(req.body.email);
        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid Email and Password',
            });
        }

        //   Check Password
        const validPassword = await validateUserPassword(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ status: 'error', message: 'Invalid Email and Password' });
        }

        // Json Web Token
        const token = jwt.sign({ _id: user.id, type: user.type, company: user.company }, tokenSecret);

        // return
        res.status(200).json({
            status: 'success', user, token, message: 'Logged in successfully',
        });
    } catch (error) {
        if (error.isJoi) return res.status(400).json({ status: 'error', message: error.details[0].message });
    }
};


// Sign up user
export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let usersReq: SignupReq = req.body;
        await signupSchema.validateAsync(usersReq);


        //   check if user exists
        let userProfile: any = await fetchProfileByEmail(usersReq.email);

        if (userProfile) {
            return res.status(400).json({
                status: 'error',
                message: 'This user exists already.',
            });
        }

        //   create user
        let user: any = await createAccount(usersReq);
        user = OmitPassword(user)

        // Json Web Token
        const token = jwt.sign({ email: user.email }, AppConfig.tokenSecret);
        return res.status(200).json({
            status: "Success",
            message: 'Account Created Successfully.',
            data: {
                token,
                user
            },
        });



    } catch (error) {
        LogError(error, 'Signup User');
        if (error.isJoi) return res.status(400).json({ status: 'error', message: error.details[0].message });
    }
};