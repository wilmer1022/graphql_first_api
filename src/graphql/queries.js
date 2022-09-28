import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { PostType, UserType, CommentType } from "./types";
import { User, Post } from "../models";

const root = {
  type: GraphQLString,
  description: "returns the root query",
  resolve: () => "GraphQL API",
};

const users = {
  type: new GraphQLList(UserType),
  description: "Get all users",
  resolve: async () => {
    return User.find();
  },
};

const user = {
  type: UserType,
  description: "Get an user by id",
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    return User.findById(args.id);
  },
};

const posts = {
  type: new GraphQLList(PostType),
  description: "Get all post",
  resolve: async () => {
    return Post.find();
  }
}

export { root, users, user, posts };
