require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { loginRequired } = require("./middleware");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const chefsRouter = require("./routes/chefs");
const mealsRouter = require("./routes/meals");
const searchRouter = require("./routes/search");
const mapsRouter = require("./routes/maps");
const stripeRouter = require("./routes/stripe");
const messagesRouter = require("./routes/messages");

const { json, urlencoded } = express;

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
app.get("/health", (req, res) => res.json({ success: true }));
app.use("/auth", authRouter);
app.get("/ping", loginRequired, (req, res) => res.json({ success: true }));
app.use("/users", loginRequired, usersRouter);
app.use("/chefs", loginRequired, chefsRouter);
app.use("/meals", loginRequired, mealsRouter);
app.use("/search", loginRequired, searchRouter);
app.use("/maps", mapsRouter);
app.use("/stripe", loginRequired, stripeRouter);
app.use("/messages", loginRequired, messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client", "build")));
}

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = app;
