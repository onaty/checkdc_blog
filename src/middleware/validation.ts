// import Joi from '@hapi/joi';
import * as Joi from '@hapi/joi';

export const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});


export const signupSchema = Joi.object({
  firstname: Joi.string().min(1).required(),
  lastname: Joi.string().min(1).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});
