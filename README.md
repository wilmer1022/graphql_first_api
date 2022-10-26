## Graphql Nodejs Mongodb Blog API

Simple GraphQL Blog API using Nodejs and Mongodb

### Requirements

- Docker
- Mongodb
- Nodejs

## util init commands

```
npm init -y
npm i -D @babel/cli @babel/core @babel/node @babel/plugin-transform-runtime @babel/preset-env nodemon
npm i bcryptjs cors dotenv express express-handlebars express-graphql graphql @graphql-tools/utils @graphql-tools/merge @graphql-tools/schema @graphql-tools/resolvers-composition jsonwebtoken mongoose morgan
```

## queries and graphql mutations examples

```
mutation {
  register(username: "wdguarin", email: "wdguarin@email.com", password: "davidroot", displayName: "Wilmer", role: ["admin", "user"])
}

mutation {
  login(email: "wdguarin@email.com", password: "davidroot")
  {
    user
    {
      displayName
      email
      username
    }
    token
    loginDate
  }
}

mutation {
  createPost(title: "The first post", body: "test body and any content")
}

query {
  users
  {
    id
    displayName
    email
    roles {
      name
    }
  }
}

query {
  posts {
    id
    title
    body
    likes
    author {
      displayName
    }
    comments(numLimit: 1) {
      id
      comment
      likes
      user {
        displayName
      }
    }
  }
}

mutation {
  createComment(comment: "A new comment", postId: "<post_id>")
}

query {
  post(id: "<post_id>")
  {
    title
    body
    comments {
      comment
    }
  }
}

mutation {
  updatePost(id: "<post_id>", title: "post updated", body: "changed content in post")
}
```

### Environment variables

```
MONGODB_URI
PORT
JWT_SECRET
JWT_EXPIRES_IN
ADMIN_EMAIL
ADMIN_USERNAME
ADMIN_PASSWORD
```

### Installation

```
npm i
npm start
```