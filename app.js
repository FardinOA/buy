const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();
const path = require("path");

//////////////////////////////

// config

require("dotenv").config({ path: "backend/.env" });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//all routes
const productRoute = require("./src/routes/productRoute");
const userRoute = require("./src/routes/userRoute");
const orderRoute = require("./src/routes/orderRoute");
const paymentRoute = require("./src/routes/paymentRoute");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./index.html"));
});

//middleware for error
app.use(errorMiddleware);
module.exports = app;
