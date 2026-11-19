// The café's Express app. For you to finish, with the games router in routes/games.js.
//
// Answer each request below with its status code and a JSON body (res.json sends the header
// Content-Type: application/json for you).
//
//   GET /games                          200, every game in games.js
//   GET /games?players=4                200, only the games made for a group of 4 (minPlayers 4 or fewer and
//                                       maxPlayers 4 or more): games 1, 2, 4 and 6
//   GET /games?maxMinutes=30            200, only the games that take 30 minutes or less: games 2, 3, 5 and 6
//   GET /games?players=4&maxMinutes=30  200, only the games that pass both filters: games 2 and 6
//   GET /games?players=12               200, an empty list, []: no game is made for a group of 12
//   GET /games/4                        200, game 4 (every game's id works the same way)
//   GET /games/99                       404, { "message": "There's no game 99." }
//   GET /games/chess                    404, { "message": "There's no game chess." }
//   POST /games                         201, the new game, kept on the shelf. For the body
//                                       { "title": "Lantern Festival", "minPlayers": 2, "maxPlayers": 4, "minutes": 35 }
//                                       the answer is { "id": 9, "title": "Lantern Festival", "minPlayers": 2,
//                                       "maxPlayers": 4, "minutes": 35, "available": true }: its id is one more than
//                                       the number of games on the shelf, and a new game is always available
//   GET /snacks                         404, { "message": "There's nothing at /snacks." }
//                                       (any other address, named by its path without the query string)
//
// Every answer, 404s included, carries the header X-Response-Time: how long the answer took, in milliseconds,
// with one digit after the point and "ms" after it, such as 0.8ms.
//
// For now, the app answers every request with a 404 that says it isn't built yet.
import express from "express";
import { gamesRouter } from "./routes/games.js";

export const app = express();

app.use((req, res) => {
  res.status(404).json({ message: "Not built yet." });
});
