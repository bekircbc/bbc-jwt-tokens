import mongoose from "mongoose";
import { config } from "./config.js";

mongoose
  .connect(config.DB_MONGO_URL)
  .then(() => console.log("Connection to database established!"))
  .catch((err) => console.log("[ERROR] Connection failed!", err.message));
