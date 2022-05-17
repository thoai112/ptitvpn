require("rootpath");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const errorHandler = require("./database/errorHandler");

var indexRouter = require("./routes/vpn.controllers");
var usersRouter = require("./routes/user.controllers");
var serversRouter = require("./routes/server.controllers");
var networksRouter = require("./routes/network.controllers");
var vpnsRouter = require("./routes/vpn.controllers");

var app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/server", serversRouter);
app.use("/network", networksRouter);
app.use("/vpn", vpnsRouter);

// catch 404 and forward to error handler
app.use(errorHandler);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(5000, () => console.log(`Server is listening on PORT: 5000`));
module.exports = app;
