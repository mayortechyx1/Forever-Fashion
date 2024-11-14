import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/error.js";

// App Config
const port = process.env.PORT;
connectDB();
const app = express();

// Body Parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Server Routes
app.use("/api/auth", authRoute);

// error middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log("App is running"));
