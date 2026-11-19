// The games router: every /games route. For you to finish.
// app.js mounts it at /games, so the paths here leave /games out: "/" answers /games, and "/:id" answers /games/4.
// The requests it answers are listed at the top of app.js.
import express from "express";
import { games } from "../games.js";

export const gamesRouter = express.Router();
