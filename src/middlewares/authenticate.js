import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      return next(createHttpError(401, 'Not authorized'));
    }

    req.user = user;
    next();
  } catch {
    next(createHttpError(401, 'Not authorized'));
  }
};
