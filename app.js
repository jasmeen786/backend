const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const rootRoutes = require("./routes/root.routes");
const { errorHandler } = require("./middlewares/errorHandler");

// midlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Route is working!");
});

app.use("/api/v1", rootRoutes);

app.use(errorHandler);

module.exports = app;
