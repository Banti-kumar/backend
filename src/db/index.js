import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    // try to connect to database using mongoose connect method and pass the connection string as the first argument and the database name as the second argument
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    // log the connection host if connection is successful
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // catch the error if connection fails and log the error and exit the process with status code 1
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB; // export connectDB function to use in other files
