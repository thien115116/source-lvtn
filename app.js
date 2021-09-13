var express = require("express");
let mysql = require("./configs/database");
const color = require("colors");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./src/middleware/error-handler");
const _serviceAccount = require("./src/service/initAccountAdmin");
const _serviceBanner = require("./src/service/banner.Service");

const app = express();
var http = require("http").createServer(app);

_serviceAccount._initAccount();
// _serviceBanner.bannerTest();

// Declera variable for routes call API
const users = require("./src/routes/user.Routes");
const product = require("./src/routes/product.Routes");
const merchant = require("./src/routes/merchant.Routes");
const tag = require("./src/routes/tag.Routes");
const uploadFiles = require("./src/routes/upload.Routes");
const search = require("./src/routes/search.Routes");
const brand = require("./src/routes/brand.Routes");
const attribute = require("./src/routes/attributes.Routes");
const topping = require("./src/routes/topping.Routes");
const publicClient = require("./src/routes/public.Routes");
const merchantClient = require("./src/routes/merchantClient.Routes");
const voucher = require("./src/routes/voucher.Routes");
const support = require("./src/routes/support.Routes");
const fee = require("./src/routes/fees.Routes");
const menu = require("./src/routes/menu.Routes");
const fcm = require("./src/routes/fcm.Routes")

/// Oder
const oder = require("./src/routes/oder.Routes");

/// Home Client
const homeClient = require("./src/routes/homeClient.Routes");

const admin = require("./src/routes/admin.Routes");

//Shipper
const shipper = require("./src/routes/shipper.Routes");

// Variable
const PORT = process.env.PORT || 3100;

app.use(cors());

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

// Public folder to extend
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("resources"));

// Setup all
app.use(
  express.json({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config({
  path: "./configs/.env",
});

app.get("/", function (req, res) {
  res.render("home");
});
app.get("/verify-email", function (req, res) {
  res.render("verify");
});
app.get("/merchant", function (req, res) {
  res.render("merchant");
});
app.get("/assign-merchant", function (req, res) {
  res.render("assign_merchant");
});

// Routes API
app.use("/api/users", users);
app.use("/api/products", product);
app.use("/api/merchants", merchant);
app.use("/api/tags", tag);
app.use("/api/search", search);
app.use("/api/file", uploadFiles);
app.use("/api/brand", brand);
app.use("/api/attribute", attribute);
app.use("/api/topping", topping);
app.use("/api/fee", fee);
app.use("/api/fcm", fcm);

app.use("/api/web", merchantClient);
app.use("/api/menu", menu);
// Oder

app.use("/api/oder", oder);

//Home App BOO
app.use("/api/home", homeClient);
app.use("/api/public", publicClient);
app.use("/api/voucher", voucher);
app.use("/api/support", support);

//Home App BOO
app.use("/api/home", homeClient);

// Router base-admin
app.use("/api/base-admin", admin);

// Router Shipper
app.use("/api/shipper", shipper);

//Snap URL Err
app.use(errorHandler.notFound);

//server start
http.listen(
  PORT,
  console.log(
    `Server running on port: http://localhost:${PORT}`.green.underline.bold
  )
);
