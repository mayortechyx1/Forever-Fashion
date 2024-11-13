import express from "express";
import colors from "colors";
import connectDB from "./controllers/db.js";

const port = process.env.PORT;

connectDB();

const app = express();

app.get("/", async (req, res) => {
  res.send("Hello fashion world");
});

app.listen(port, () => console.log("App is running"));
