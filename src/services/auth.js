import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { User } from '../models/user.js';

export const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
  });

  return newUser;
};
