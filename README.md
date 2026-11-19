# Exercise: Board Game Shelf API

Exercise code for the lesson **Exercise: Board Game Shelf API** in the Node.js in Depth course on [ask-codey.com](https://www.ask-codey.com).

The Rolling Dice board game café wants its customers to check the shelf before they come in. You'll finish the café's API with Express: a games router that lists the games (with filters for the group size and the time a game takes), finds one game by its id, and adds a game, plus a middleware that times every answer and a JSON 404 for any other address. Tests check every answer.

## What's here

- `app.js`: the Express app, `export const app = express()`. For now it answers every request with a 404 that says it isn't built yet. The comment at the top lists every request the API should answer, and how. For you to finish.
- `routes/games.js`: the games router, `gamesRouter`, with no routes yet. For you to finish.
- `games.js`: the café's eight games, and `resetGames()`, which the tests use to put the shelf back before each test. Ready to use.
- `server.js`: starts your app at `http://localhost:3100`. Ready to use.
- `shelf.http`: the requests to try, for VS Code's REST Client extension. Ready to use.
- `app.test.js`: tests that send requests to your app with Supertest and check each answer. You don't need to change this file.
- `package.json` and `package-lock.json`: the project's settings, its scripts (`start`, `dev` and `test`), Express, and Supertest for the tests, each at an exact version. Ready to use.

## Before you start

In VS Code's terminal, in this folder, install Express and the package the tests use:

```bash
npm install
```

It makes a `node_modules` folder. That folder is in `.gitignore`, so Git leaves it out: `npm install` makes it again on any computer.

## Run it

```bash
npm start
```

The terminal says `The café's API is listening on http://localhost:3100` and keeps running. Open `shelf.http` and click **Send Request** above any request; REST Client shows the answer beside it. Stop the server with **Ctrl+C**.

`npm run dev` starts it with `node --watch`, so it restarts each time you save a file. A game you add with `POST /games` is kept only until the server restarts.

## Check your work

```bash
npm test
```

No server needs to be running: the tests hand each request straight to `app`. At first every test fails: that is expected. Each request you answer turns its test green. A failing test's message says what it sent and what it expected, for example *GET /games/4 should answer 200, but it answered 404.*

## The rules

- Use Express. Put every `/games` route in the router in `routes/games.js`, and mount it in `app.js` at `/games`.
- Every answer is JSON, 404s included, and carries the header `X-Response-Time`, such as `0.8ms`.
- Keep the app in `app.js` and the `listen` call in `server.js`: the tests import `app` without starting a server.
- Add new games to the `games` array in `games.js` with `games.push()`, and don't change the eight games in it: the tests compare your answers with them.
- Checking what a POST sends, and answering 400 for a bad body, comes in the next chapter. Here every POST the tests send is complete.

## Tips

- Route and query parameters are text. Turn them into numbers with `Number()` before you compare them with a game's numbers.
- A query parameter that wasn't sent is `undefined`. Filter only when it's there, so `GET /games` still answers every game.
- Inside the router, paths leave `/games` out: `"/"` and `"/:id"`.
- `express.json()` has to run before the POST route, or `req.body` is `undefined`.
- Order matters in `app.js`: the timing middleware first, so every answer is timed, then the router, then the 404 for whatever no route answered.
- A header has to be set before the headers are sent. Node calls `res.writeHead` just before that happens.

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
