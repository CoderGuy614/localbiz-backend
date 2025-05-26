const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/api/auth");
const userRoutes = require("./routes/api/users");
const categoryRoutes = require("./routes/api/categories");
const itemRoutes = require("./routes/api/items");
const bizRoutes = require("./routes/api/biz");
const messageRoutes = require("./routes/api/messages");

const app = express();

//Connect Database
connectDB();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", itemRoutes);
app.use("/api", bizRoutes);
app.use("/api", messageRoutes);

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));
