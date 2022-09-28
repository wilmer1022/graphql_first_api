import express from "express";
import cors from "cors";
import morgan from "morgan";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

export default app;
