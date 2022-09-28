import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db/connect";
import "./libs/initialSetup.js";

connectDB();

app.listen(PORT);
console.log("Server on port", app.get("port"));
