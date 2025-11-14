import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const mongoDB = await mongoose.connect(process.env.DB_URL_CONNECTION, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection successful");
  } catch (error) {
    console.log(error);
  }
};
