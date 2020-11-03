const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));
// app.use(express.static("front/build"));
app.use(express.static(path.join(__dirname, "./front/build")));
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./front/build", "index.html"));
});

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

module.exports = app;
