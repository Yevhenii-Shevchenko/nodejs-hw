import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const registerUser = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = await User.create({
    email: req.body.email,
    password: hashedPassword,
  });

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }
  // const { email, password } = req.body;
  // const user = await User.findOne({ email });
  // if (!user) {
  //   throw createHttpError(401, 'Invalid credentials');
  // }
  // const isValidPassword = await bcrypt.compare(password, user.password);
  // if (!isValidPassword) {
  //   throw createHttpError(401, 'Invalid credentials');
  // }
  // await Session.deleteOne({ userId: user._id });
  // const session = await createSession(user._id);
  // setSessionCookies(res, session);

  res.status(200).json(user);
};
