import { User } from "../models";
import { ROLES } from "../models/Role.js";

export const checkExistingUser =
  () => (next) => async (root, args, context, info) => {
    try {
      const userFound = await User.findOne({ username: args.username });
      if (userFound) throw new Error("The user already exists");

      const email = await User.findOne({ email: args.email });
      if (email) throw new Error("The email already exists");

      return next(root, args, context, info);
    } catch (error) {
      throw new Error(`An error has ocurred: ${error}`);
    }
  };

export const checkExistingRole =
  () => (next) => async (root, args, context, info) => {
    if (!args.role.length) throw new Error("No roles provided");

    for (let i = 0; i < args.role.length; i++) {
      if (!ROLES.includes(args.role[i]))
        throw new Error(`Role ${args.role[i]} does not exist`);
    }

    return next(root, args, context, info);
  };
