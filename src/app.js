import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User/index.js";
import auth from "./api/auth/routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "express-async-errors";

mongoose
  .connect(process.env.DB_GUI)
  .then(console.log("DB connected"))
  .catch((error) => console.error(error));

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);
app.use(errorHandler);

// app.get("/healthcheck", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Server is running!", timestamp: Date.now() });
// });

// app.post("/", (req, res) => {
//   const { body, query, params } = req;
//   const { id } = params;
//   res.status(200).json({ body, query, id });
// });

// app.post("/register", async (req, res) => {
//   const { body } = req;
//   const { username, email, password } = body;
//   await User.create({ username, email, password });
//   res.status(201).json({ data: user });
// });

app.listen(process.env.PORT || 8080, function () {
  const { port } = this.address();
  console.log(`Server is listening on port ${port}`);
});
