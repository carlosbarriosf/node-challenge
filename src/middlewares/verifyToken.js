import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ msg: "Invalid token" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError")
      return res.status(401).json({ msg: "Token expired" });

    if (error.name == "JsonWebTokenError")
      return res.status(401).json({ msg: "Invalid Token" });

    return res.status(500).json({ msg: "Internal server error" });
  }
};
