import express from "express";
import cors from "cors";
import animalsRouter from "./routes/animals.router.js";
import "./db-connect.js";
import usersRouter from "./routes/users.router.js";
import { auth } from "./middleware/auth.js";
const app = express();

// BODY PARSER
// => parse incoming JSON body into
// special variable req.body
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World from API!</h1>");
});

// REGISTER ROUTES
app.use("/users", usersRouter);
app.use("/animals", auth, animalsRouter);

// catch all handler (404)
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route not found, buddy",
  });
});

// GENERIC ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
