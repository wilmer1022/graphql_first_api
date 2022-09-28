import { makeExecutableSchema } from "@graphql-tools/schema";
import { composeResolvers } from "@graphql-tools/resolvers-composition";
import { root, users, user, posts } from "./queries";
import { register, login, createPost, createComment } from "./mutations";
import { checkExistingUser, checkExistingRole } from "../middlewares/verifySignup";
import { authenticate, isAdmin } from "../middlewares/auth";

const resolvers = {
  Query: {
    root,
    users,
    user,
    posts,
  },
  Mutation: {
    register,
    login,
    createPost,
    createComment,
  },
};

const resolversComposition = {
  "Query.users": [authenticate(), isAdmin()],
  "Mutation.register": [checkExistingUser(), checkExistingRole()],
  "Mutation.createPost": [authenticate()],
  "Mutation.createComment": [authenticate()],
};

const composedResolvers = composeResolvers(resolvers, resolversComposition);

export const schema = makeExecutableSchema({
  typeDefs: [
    /* GraphQL */ `
      type Query {
        root: String
        users: __Type
        user: __Type
        posts: __Type
      }
      type Mutation {
        register: String
        login: __Type
        createPost: String
        createComment: String
      }
    `,
  ],
  resolvers: composedResolvers,
});
