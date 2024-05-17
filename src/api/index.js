import express from "express";
import auth from "./auth/routes";

const api = express.Router();

api.use("/auth", auth);
