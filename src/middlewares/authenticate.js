import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw createHttpError(401, 'Authorization header not found');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw createHttpError(401, 'Invalid authorization header');
    }

    let payload;

    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      throw createHttpError(401, 'Invalid or expired token');
    }

    const user = await User.findById(payload.id || payload._id || payload.sub);

    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
