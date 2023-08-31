// // require("dotenv").config();
// const mongoose = require("mongoose");
// // const DB_URI = process.env.DB_URI
// const DB_URI = "mongodb+srv://Alex:6wJhgXLqD7Amwcdh@cluster0.xeqi0s9.mongodb.net/db-contacts?retryWrites=true&w=majority"

// async function run() {
//   try {
//      await mongoose.connect(DB_URI);
//     console.log("Database connection successful");
//   } catch (error) {
//       console.log(error);
//       process.exit(1);
//   } finally {
//     // mongoose.disconnect();
//   }
// }
// run();