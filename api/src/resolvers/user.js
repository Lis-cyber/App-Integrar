import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

// Query
export const allUsers = async (_, args, ctx) => {
  return await User.find();
};

export const createUser = async (_, args, ctx) => {
  try {
    const existingUser = await User.findOne({ dni: args.userInput.dni });
    if (existingUser) {
      throw new Error("User exists already.");
    }
    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

    const user = new User({
      dni: args.userInput.dni,
      email: args.userInput.email,
      password: hashedPassword,
    });

    const result = await user.save();

    return {
      dni: result.dni,
      email: result.email,
      password: null,
      _id: result._id,
    };
  } catch (err) {
    throw err;
  }
};

export const login = async (_, { dni, password }, ctx) => {
  const user = await User.findOne({ dni: dni });
  if (!user) {
    return { error: { dni: true, password: false } };
    // throw new Error("User does not exist!");
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    return { token: null, user: null, error: { dni: false, password: true } };
    // throw new Error("Password is incorrect!");
  }
  const token = jwt.sign({ userId: user.id, dni: user.dni }, JWT_SECRET);
  return { token, user, error: { password: null, dni: null } };
};

export const editUser = async (_, args, ctx) => {
  let user = await User.findById(args._id);
  let inputs = args.input;
  for (const key in inputs) {
    key ? (user[key] = input[key]) : user[key];
  }
  // args.input.dni ? (user.dni = args.input.dni) : null;
  // args.input.password ? (user.password = args.input.password) : null;
  // args.input.email ? (user.email = args.input.email) : null;

  await user.save();

  return user;

  // return await User.findByIdAndUpdate(
  //   args._id,
  //   { $push: args.input },
  //   { new: true }
  // );
};

export const deleteUser = async (_, args, ctx) => {
  return await User.findByIdAndDelete(args._id);
};

export const changePassword = async (_, { newPassword, userId }) => {
  const user = await User.findById(userId);

  if (!user) return false;

  const password = await bcrypt.hash(newPassword, 12);
  user.password = password;
  await user.save();
  return true;
};
