import bcrypt from "bcrypt";
import { Session } from "../models/session.js";
import { createSession, setSessionCookies, registerUser } from "../services/auth.js";

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );
    if (!isValidPassword) {
        throw createHttpError(401, "Invalid credentials");
    }

 await Session.deleteOne({ userId: user._id });

  const session = await createSession(user._id);
  setSessionCookies(res, session);

  res.status(200).json(user);
};

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, "Session not found");
  }

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "Session token expired");
  }

  const isRefreshTokenExpired = session.refreshTokenValidUntil < new Date();
  if (isRefreshTokenExpired) {
    await session.deleteOne();
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");
    throw createHttpError(401, "Invalid session");
  }

  await session.deleteOne();

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: "Session refreshed",
  });
};

export const logoutUser = async (req, res) => {
  if (req.cookies.sessionId) {
    await Session.deleteOne({ _id: req.cookies.sessionId });
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("sessionId");

  res.status(204).send();
};

export const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
