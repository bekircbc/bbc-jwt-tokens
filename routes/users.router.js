import express, { urlencoded } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// SIGNUP of a new User
// Full Route /users
usersRouter.post("/", async (req, res, next) => {
  const { password: pwPlain } = req.body;

  const pwHashed = bcrypt.hashSync(pwPlain, 10);
  req.body.password = pwHashed;

  try {
    const userNew = await User.create(req.body);
    res.json(userNew);
  } catch (err) {
    err.status = 400;
    next(err); // forward to GENERIC EXPRESS ERROR HANDLER
  }
});

// LOGIN route
// /users/login
usersRouter.post("/login", async (req, res, next) => {
  const { email, password: pwPlain } = req.body;

  const userFound = await User.findOne({ email });

  if (!userFound) {
    return next({ message: "User not found", status: 400 });
  }

  // user exists => check password
  const pwMatches = bcrypt.compareSync(pwPlain, userFound.password);

  if (!pwMatches) {
    return next({ message: "User not found", status: 400 });
  }

  // user exists! generate JWT token
  const tokenData = { _id: userFound._id, email: userFound.email };
  const token = jwt.sign(tokenData, config.JWT_SECRET, {
    expiresIn: config.JWT_LIFETIME,
  });

  res.json({ token });
});

// Full us
usersRouter.put("/:id", async (req, res, next) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(userUpdated);
  } catch (err) {
    next(err);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);
    res.json(userDeleted);
  } catch (err) {
    next(err);
  }
});

export default usersRouter;
