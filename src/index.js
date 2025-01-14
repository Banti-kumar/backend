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
    app.on("error", (error) => {
      console.log("connrction is fail", error); // handle error
    });
    app.listen(process.env.PORT || 8085, () => {
      // listen to Provided port or 8085
      console.log(`Server is running on port ${process.env.PORT}`); // handle success
    });
  })
  .catch((error) => {
    // error handling
    console.error("Connection Fail Mongo", error);
  });
