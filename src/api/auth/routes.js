import express from "express";
import { login } from "./controllers";

const auth = express.Router();

auth.post("/login", login);

export default auth;
