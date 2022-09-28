import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
const { Post, Comment, User, Role } = require("../models");

const RoleType = new GraphQLObjectType({
  name: "Role",
  description: "The role type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "The user type",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    roles: {
      type: new GraphQLList(RoleType),
      resolve(parent) {
        return Role.find({ _id: { $in: parent.roles } });
      },
    },
    registerDate: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const ProfileType = new GraphQLObjectType({
  name: "Profile",
  description: "The profile type",
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString },
    loginDate: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "The post type",
  fields: () => ({
    id: { type: GraphQLID },
    author: {
      type: UserType,
      resolve(parent) {
        console.log(parent.authorId)
        return User.findById(parent.authorId);
      },
    },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent) {
        return Comment.find({ postId: parent.id });
      },
    },
    likes: { type: GraphQLInt },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  description: "comments type",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    },
    post: {
      type: PostType,
      resolve(parent) {
        return Post.findById(parent.postId);
      },
    },
    likes: { type: GraphQLInt },
  }),
});

export { UserType, PostType, ProfileType, CommentType };
