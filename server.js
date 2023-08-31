require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const URI = process.env.DB_URI;

async function run() {
  try {
     await mongoose.connect(URI);
    console.log("Database connection successful");
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
  finally {
    // mongoose.disconnect();
  }
}
run();

const PORT = process.env.URI || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
