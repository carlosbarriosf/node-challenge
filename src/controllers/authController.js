import { User } from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { body } = req;

  try {
    const email = body.email;
    const password = body.password;

    const existentUser = await User.findOne({ email });
    if (existentUser) {
      return res.status(405).json({ msg: "This email is already in use" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email: email, password: hashedPass });

    if (!newUser) throw new Error("Error creating user");
    return res
      .status(201)
      .json({ user: newUser, msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "An error has ocurred" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Email and password are required" });

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(401).json({ msg: "Invalid email or password" });

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (!isAuthenticated)
      return res.status(401).json({ msg: "Invalid mail or password" });

    const payload = { id: user._id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    return res
      .status(200)
      .json({ accessToken: accessToken, msg: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
