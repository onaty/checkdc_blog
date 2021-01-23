import bcrypt from 'bcrypt-nodejs';
import User from '../models/User';
import { dateNow, dateToTimestamp } from '../middleware/time';
import { SignupReq } from '../datamodels/user.model';
import { generateRandomString } from './helperComponent';
import _ from 'lodash';

// validate user email
export const validateEmail = async (email: string) => {
    const user = await User.findOne({ email });
    //   console.log(user);
    return user;
};

// fetch user by id
export const validateUserbyId = async (id: any) => {
    const user = await User.findOne({ _id: id });
    //   console.log(user);
    return user;
};

// validate user phone
export const validatePhone = async (data: any, type: string) => {
    const user = await User.findOne({ phone: data.phone, type });
    return user;
};

// validate user password
export const validateUserPassword = (password: string, userpassword: string) => {
    const validPassword = bcrypt.compareSync(password, userpassword);
    return validPassword;
};

// hash password
export const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

// fetch user via id
export const fetchProfileById = async (id: string) => {
    const user = await User.findOne({ _id: id });
    return user;
};

// fetch user via email
export const fetchProfileByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
};

// sign up user
export const createAccount = async (data: SignupReq) => {

    // Password
    let verifyToken = await generateRandomString(60);
    let hash = await hashPassword(data.password);
    data.password = hash;
    let userData = {
        ...data,
    };


    //   Process user
    const user = new User({
        ...userData

    });
    const newUser = await user.save();
    return newUser;
};
// verify token
export const checkVerifyToken = async (token: string) => {
    const user = await User.findOne({ 'verification.token': token });
    return user;
};

// verify account
export const verifyUserAccount = async (id: string) => {
    const date = await dateNow();
    const update = await User.updateOne(
        { _id: id },
        {
            $set: {
                'verification.status': true,
                updated_at: date,
            },
        },
    );
    return update;
};

// delete account
export const deleteAccount = async (id: string) => {
    const date = await dateNow();
    const update = await User.updateOne(
        { _id: id },
        {
            $set: {
                'status': false,
                updated_at: date,
            },
        },
    );
    return update;
};

// Omit user password
export const OmitPassword = (user: any) => {
    const newData = _.omit(user.toJSON(), ['password'])
    return newData;
};


// update login count
export const updateLoginCount = async (id: string, count: number) => {
    const date = await dateNow();
    await User.updateOne(
        { _id: id },
        {
            $set: {
                lastLogin: date,
                loginCount: count,
            },
        },
    );
    const user = await fetchProfileById(id);
    return user;
};
