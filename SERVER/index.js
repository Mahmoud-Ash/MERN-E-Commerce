const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch(err => console.log(err));

// parse json objects
app.use(
  express.json({
    origin: [process.env.CLIENT_URL],
    origin: ["POST", "GET"],
    credentials: true,
  })
);

//enable cross-origin-resource-sharing
const cors = require("cors");
app.use(cors());

//check if server is working properly
app.get("/", (_req, res) => {
  res.send("API is working!");
});

//auth Route
const authRoute = require("./routes/auth.js");
app.use("/api/auth", authRoute);

// user Route
const userRoute = require("./routes/user.js");
app.use("/api/users", userRoute);

// user Route
const categoryRoute = require("./routes/category.js");
app.use("/api/categories", categoryRoute);

// PRODUCT ROUTE
const productRoute = require("./routes/product.js");
app.use("/api/products", productRoute);

// WISHLIST ROUTE
const wishlistRoute = require("./routes/wishlist.js");
app.use("/api/wishlists", wishlistRoute);

// CART ROUTE
const cartRoute = require("./routes/cart.js");
app.use("/api/carts", cartRoute);

// ORDER ROUTE
const orderRoute = require("./routes/order.js");
app.use("/api/orders", orderRoute);

// STRIPE PAYMENT ROUTE
const stripeRoute = require("./routes/stripe.js");
app.use("/api/checkout", stripeRoute);

// run server on port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`backend server is running at : http://localhost:${port}`);
});
