import Admin from "../models/Admin";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { sendMailWithPassword } from "../mail";

// Query
export const admin = async (_, args, ctx) => {
  return await Admin.find();
};

// Mutations
export const createAdmin = async (_, { input }, ctx) => {
  let newAdmin;
  try {
    newAdmin = await new Admin(input).save();
  } catch (err) {
    console.log(err);
    return { status: false, error: JSON.stringify(err) };
  }

  const password = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(password, 12);
  const { name, email, dni } = input;

  let user = await new User({
    name,
    email,
    dni,
    password: hash,
    role: "Admin",
  }).save();

  console.log(`The password for dni ${user.dni} (Admin) is: `, password);

  const [isMailSent, error] = await sendMailWithPassword(user, password);

  if (!isMailSent) return error;

  return newAdmin;
};

export const editAdmin = async (_, args, ctx) => {
  let admin = await Admin.findById(args._id);
  let inputs = args.input;
  for (const key in inputs) {
    key ? (admin[key] = input[key]) : admin[key];
  }

  await admin.save();

  return admin;
};

export const deleteAdmin = async (_, args, ctx) => {
  return await Admin.findByIdAndDelete(args._id);
};
