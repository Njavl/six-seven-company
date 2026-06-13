import Joi from 'joi';

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(8).required(),
});
