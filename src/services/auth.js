import crypto from "crypto";
import { Session } from "../models/session.js";
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/index.js";
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export const createSession = async (id) => {
  return Session.create({
    userId: id,
    accessToken: crypto.randomUUID(),
    refreshToken: crypto.randomUUID(),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const setSessionCookies = (res, session) => {
  res.cookie("accessToken", session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: ONE_DAY,
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: ONE_DAY,
  });
};

export const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    return await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });
  } catch (error) {
    if (error.code === 11000) {
      throw createHttpError(409, 'Email in use');
    }
    throw error;
  }
};
