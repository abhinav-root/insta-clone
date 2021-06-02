const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connection to mongoDB
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(process.env.MONGO_URI, options)
  .then((results) => console.log("connected to MongoDB"))
  .catch((error) => console.log(error));

// global middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.static("images"));
// routes
app.use("/auth", require("./routers/userRouter"));
app.use("/post", require("./routers/postRouter"));
app.use("/profile", require("./routers/profileRouter"));

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
console.log(__dirname + "./public/");
