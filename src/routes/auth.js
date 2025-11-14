import express from "express";
import { login, signUp } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const route = express.Router();

route.post("/register", signUp);
route.post("/login", login);

route.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ msg: "Access granted", user: req.user });
});

export default route;
