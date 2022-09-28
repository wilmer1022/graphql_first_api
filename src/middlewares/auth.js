import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { User, Role } from "../models";

export const authenticate =
  () => (next) => async (root, args, context, info) => {
    const token = context.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    try {
      const verified = jwt.verify(token, JWT_SECRET);
      const verifiedUser = {
        _id: verified.user._id,
        email: verified.user.email,
      };
      const user = await User.findById(verifiedUser._id, { password: 0 });
      if (!user) throw new Error("No user found");

      context.id = verifiedUser._id;
      return next(root, args, context, info);
    } catch (error) {
      console.error(error);
      throw new Error(`Unauthorized! An error has ocurred: ${error}`);
    }
  };

export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.verifiedUser._id);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = () => (next) => async (root, args, context, info) => {
  try {
    const user = await User.findById(context.id);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next(root, args, context, info);
      }
    }

    throw new Error("Require Admin Role!" );
  } catch (error) {
    console.log(error);
    throw new Error(`An error has ocurred: ${error}`);
  }
};
