// vendors
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// models
import Users from "../models/users.model.js";
import {ROLES, USER_STATUS} from "../constants/user.constants.js"

const allUsers = async (parent, args, { user, errorMessage }) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  //if(user.role!=ROLES.admin){
  //  throw new Error("No tiene acceso");
  //}
  return await Users.find();
};

const user = async (parent, args, context) => {
  const user = await Users.findById(args._id);
  return user;
};

const register = async (parent, args, context) => {
  const user = new Users({
    ...args.input,
    status: USER_STATUS.pending,
    password: await bcrypt.hash(args.input.password, 12),
  });
  return user.save();
};

const userByEmail = async (parent, args, context) => {
  const user = await Users.findOne({ email: args.email });
  return user;
};

const userContext = async (parent, args, {user}) => {
  //const user = await Users.findOne({ email: args.email });
  return user;
};

const login = async (parent, args) => {
  const user = await Users.findOne({ email: args.email });
  if (!user) {
    throw new Error('User not found');
  }
  //const { password, _id, email } = user;
  const isValid = await bcrypt.compare(args.password, user.password);
  if(!isValid) {
    throw new Error('Wrong password');
  }
  const token = await jwt.sign(
    {user},
    process.env.SECRET,
    { expiresIn: "1h" }
  );
  console.log({user});
  return token;
};

export default {
  userQueries: {
    allUsers,
    user,
    userByEmail,
    userContext
  },
  userMutations: {
    register,
    login,
  },
}