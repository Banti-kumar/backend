import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  // dotenv configuration
  path: "./.env", // path to .env file
});

connectDB() // connect to database
  .then(() => {
    // if connection is successful
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️   Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    // error handling
    console.error("Connection Fail Mongo", error);
  });
