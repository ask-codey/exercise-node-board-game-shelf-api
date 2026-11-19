// The Rolling Dice café's shelf of games. Ready to use: you don't need to change this file.
// Each game is made for groups of minPlayers to maxPlayers people, and takes about `minutes` to play.
// The routes read and change the games array. Keep it the same array: add to it with games.push().
const startingGames = [
  { id: 1, title: "Harbor Lights", minPlayers: 2, maxPlayers: 4, minutes: 45, available: true },
  { id: 2, title: "Moon Mice", minPlayers: 3, maxPlayers: 6, minutes: 20, available: false },
  { id: 3, title: "Tile Town", minPlayers: 1, maxPlayers: 2, minutes: 30, available: true },
  { id: 4, title: "Dragon's Picnic", minPlayers: 3, maxPlayers: 5, minutes: 60, available: true },
  { id: 5, title: "Pocket Pirates", minPlayers: 2, maxPlayers: 2, minutes: 15, available: true },
  { id: 6, title: "Word Garden", minPlayers: 2, maxPlayers: 8, minutes: 25, available: false },
  { id: 7, title: "Castle Cooks", minPlayers: 1, maxPlayers: 1, minutes: 50, available: true },
  { id: 8, title: "Night Train", minPlayers: 5, maxPlayers: 10, minutes: 40, available: true },
];

export const games = structuredClone(startingGames);

// Puts the shelf back to the eight games above. The tests call it before each test, so every test starts the same.
export function resetGames() {
  games.length = 0;
  games.push(...structuredClone(startingGames));
}
