const express = require("express");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/auth/auth");

const logger = require("morgan");

const app = express();

app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);

app.use(cors());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(express.json());
app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
  // res.status(500).json({ message: err.message });
});

module.exports = app;
