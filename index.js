import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./src/Database/database.js";
import authRoutes from "./src/routes/auth.js";
import taskRoutes from "./src/routes/task.js";

const server = express();

dotenv.config();

const api = async () => {
  await dbConnection();

  server.use(express.json());

  server.use("/api/auth", authRoutes);
  server.use("/api", taskRoutes);

  server.listen(process.env.PORT, () =>
    console.log(`Server is running on port ${process.env.PORT}`)
  );
};

api();
