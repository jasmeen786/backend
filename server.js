const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = require("./app");

if (dotenv.error) {
  console.error("Error loading .env file:", dotenv.error);
}


mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connection is successful!");
}).catch((err) => {
  console.error("Error connecting to the database:", err);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
