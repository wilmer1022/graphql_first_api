import express from "express";
import cors from "cors";
import morgan from "morgan";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { PORT } from "./config.js";

const app = express();

// Settings
app.set("port", PORT);
app.set("json spaces", 4);

// Middlewares
app.use(
  cors({
    origin: "*",
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
