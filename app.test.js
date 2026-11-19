// Tests for app.js and routes/games.js. Run them with: npm test (run npm install once first).
// Each test sends requests to your app with Supertest and checks the answer: its status code, its
// Content-Type, its JSON body and its X-Response-Time header. No server needs to be running, and no port is used:
// Supertest hands each request to app itself, which is why app.js and server.js are separate files.
// Before each test, resetGames() puts the shelf back to its eight games, so no test depends on another.
// You don't need to change this file.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { app } from "./app.js";
import { games, resetGames } from "./games.js";

beforeEach(() => {
  resetGames();
});

// Checks the parts every answer shares: its status code and its Content-Type header.
function assertJson(response, status, what) {
  assert.equal(response.status, status, `${what} should answer ${status}, but it answered ${response.status}.`);
  assert.match(response.headers["content-type"] ?? "(none)", /application\/json/,
    `${what} should send the header Content-Type: application/json.`);
}

// The games with these ids, in order, as games.js has them.
const gamesWithIds = (...ids) => ids.map((id) => games.find((g) => g.id === id));

// The ids of the games in an answer, so a failure says which games came back.
const idsOf = (body) => (Array.isArray(body) ? body.map((g) => g?.id) : body);

const lantern = { title: "Lantern Festival", minPlayers: 2, maxPlayers: 4, minutes: 35 };

test("1) GET /games answers 200 with all 8 games", async () => {
  const response = await request(app).get("/games");
  assertJson(response, 200, "GET /games");
  assert.deepEqual(response.body, games, "The body should be every game in games.js, 1 to 8, in order.");
});

test("2) GET /games?players=4 answers 200 with games 1, 2, 4 and 6", async () => {
  const response = await request(app).get("/games?players=4");
  assertJson(response, 200, "GET /games?players=4");
  assert.deepEqual(idsOf(response.body), [1, 2, 4, 6],
    "The body should be games 1, 2, 4 and 6: minPlayers 4 or fewer and maxPlayers 4 or more. The query value is text.");
  assert.deepEqual(response.body, gamesWithIds(1, 2, 4, 6));
});

test("3) GET /games?maxMinutes=30 answers 200 with games 2, 3, 5 and 6", async () => {
  const response = await request(app).get("/games?maxMinutes=30");
  assertJson(response, 200, "GET /games?maxMinutes=30");
  assert.deepEqual(idsOf(response.body), [2, 3, 5, 6],
    "The body should be games 2, 3, 5 and 6: 30 minutes or less, so Tile Town's 30 minutes counts.");
  assert.deepEqual(response.body, gamesWithIds(2, 3, 5, 6));
});

test("4) GET /games?players=4&maxMinutes=30 answers 200 with games 2 and 6", async () => {
  const response = await request(app).get("/games?players=4&maxMinutes=30");
  assertJson(response, 200, "GET /games?players=4&maxMinutes=30");
  assert.deepEqual(idsOf(response.body), [2, 6], "The body should be games 2 and 6, the games that pass both filters.");
  assert.deepEqual(response.body, gamesWithIds(2, 6));
});

test("5) GET /games?players=12 answers 200 with an empty list", async () => {
  const response = await request(app).get("/games?players=12");
  assertJson(response, 200, "GET /games?players=12");
  assert.deepEqual(response.body, [], "No game is made for a group of 12, so the body should be [].");
});

test("6) GET /games/4 answers 200 with game 4, Dragon's Picnic", async () => {
  const response = await request(app).get("/games/4");
  assertJson(response, 200, "GET /games/4");
  assert.deepEqual(response.body, gamesWithIds(4)[0], "The body should be game 4 alone, as an object, not inside an array.");
});

test("7) GET /games/99 answers 404 with the message \"There's no game 99.\"", async () => {
  const response = await request(app).get("/games/99");
  assertJson(response, 404, "GET /games/99");
  assert.deepEqual(response.body, { message: "There's no game 99." });
});

test("8) GET /games/chess answers 404 with the message \"There's no game chess.\"", async () => {
  const response = await request(app).get("/games/chess");
  assertJson(response, 404, "GET /games/chess");
  assert.deepEqual(response.body, { message: "There's no game chess." });
});

test("9) POST /games with Lantern Festival answers 201 with the new game, id 9 and available true", async () => {
  const response = await request(app).post("/games").send(lantern);
  assertJson(response, 201, "POST /games");
  assert.deepEqual(response.body, { id: 9, ...lantern, available: true },
    "The body should be the new game: id 9, the four values that were sent, and available: true.");
});

test("10) GET /games/9 after POST /games answers 200 with Lantern Festival: the new game is kept", async () => {
  await request(app).post("/games").send(lantern);
  const response = await request(app).get("/games/9");
  assertJson(response, 200, "GET /games/9, after POST /games,");
  assert.deepEqual(response.body, { id: 9, ...lantern, available: true },
    "The new game should be on the shelf: add it to the games array with games.push().");
});

test("11) GET /snacks answers 404 with the message \"There's nothing at /snacks.\"", async () => {
  const response = await request(app).get("/snacks");
  assertJson(response, 404, "GET /snacks");
  assert.deepEqual(response.body, { message: "There's nothing at /snacks." });
});

// An X-Response-Time value: digits, a point, one digit, then "ms", such as 0.8ms or 12.5ms.
const timeHeader = /^\d+\.\dms$/;

test("12) GET /games answers with an X-Response-Time header, such as 0.8ms", async () => {
  const response = await request(app).get("/games");
  const value = response.headers["x-response-time"];
  assert.ok(value !== undefined, "GET /games should send the header X-Response-Time, but it sent none.");
  assert.match(value, timeHeader, `X-Response-Time should look like 0.8ms, but it was ${value}.`);
});

test("13) GET /games/99 and GET /snacks answer with an X-Response-Time header too", async () => {
  for (const path of ["/games/99", "/snacks"]) {
    const response = await request(app).get(path);
    const value = response.headers["x-response-time"];
    assert.ok(value !== undefined,
      `GET ${path} should send the header X-Response-Time too. Add the timing middleware before the router and the 404.`);
    assert.match(value, timeHeader, `X-Response-Time should look like 0.8ms, but it was ${value}.`);
  }
});
