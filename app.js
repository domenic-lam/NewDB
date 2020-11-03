const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

app.use("/", indexRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("front/build"));

  app.get("*", () => () => {
    res.sendFile(path.join(__dirname, "front", "build", "index.html")); // relative path
  })
}

module.exports = app;
