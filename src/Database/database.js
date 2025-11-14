import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const mongoDB = await mongoose.connect(
      "mongodb+srv://carlosbarriosf:Degradito15@cluster0.xseba8s.mongodb.net/",
      {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("DB connection successful");
  } catch (error) {
    console.log(error);
  }
};
