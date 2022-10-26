import { GraphQLString, GraphQLNonNull, GraphQLList, GraphQLID } from "graphql";
import { User, Post, Role, Comment } from "../models";
import { createJWTToken } from "../utils/auth";
import { ProfileType } from "./types";

const register = {
  type: GraphQLString,
  description: "Register a new user",
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
  },
  resolve: async (_, args) => {
    const { username, email, password, displayName, role } = args;

    try {
      const roles = await Role.find({ name: { $in: role } });
      const newUser = User({
        username,
        email,
        password,
        displayName,
        roles: roles.map((role) => role._id),
      });

      await newUser.save();

      return "Registered user successfully";
    } catch (error) {
      throw new Error(error);
    }
  },
};

const login = {
  type: ProfileType,
  description: "User login",
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args) => {
    const { email, password } = args;

    try {
      const user = await User.findOne({ email: email }).select("+password");

      if (!user) throw new Error("User not found");

      const matchPassword = await User.comparePassword(
        password,
        user?.password
      );
      if (!matchPassword) throw new Error("Invalid Credentials");

      const token = createJWTToken({
        _id: user._id,
        email: user.email,
        displayName: user.displayName,
      });

      const profile = {
        user: user,
        token: token,
        loginDate: new Date().toUTCString(),
      };

      return profile;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const createPost = {
  type: GraphQLString,
  description: "Create a new Post",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args, { id }) => {
    const { title, body } = args;

    try {
      const post = new Post({
        title,
        body,
        authorId: id,
      });

      await post.save();

      return "The new post was created";
    } catch (error) {
      throw new Error(error);
    }
  },
};

const createComment = {
  type: GraphQLString,
  description: "Create a new comment",
  args: {
    comment: { type: new GraphQLNonNull(GraphQLString) },
    postId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, args, { id }) => {
    const { comment, postId } = args;

    try {
      const commnets = new Comment({
        comment,
        userId: id,
        postId,
      });

      await commnets.save();

      return "The new comment was created";
    } catch (error) {
      throw new Error(error);
    }
  },
};

const updatePost = {
  type: GraphQLString,
  description: "Update a post content",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args, { id }) => {
    try {
      const postUpdated = await Post.findOneAndUpdate(
        {
          _id: args.id,
          authorId: id,
        },
        { title: args.title, body: args.body },
        { new: true, runValidators: true }
      );

      if (!postUpdated) throw new Error("No post for given id");

      return "The post was updated";
    } catch (error) {
      throw new Error(error);
    }
  },
};

export { register, login, createPost, createComment, updatePost };
