import input from "./02-input.txt";

const sampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const lineToObj = (line) => {
  const gameObj = { red: [], green: [], blue: [] };
  const [gameNumber, handfullsStr] = line.split(":").map((i) => i.trim());
  const handfulls = handfullsStr.split(/,|;/).map((i) => i.trim());

  gameObj.gameNumber = +gameNumber.match(/\d+/)[0];

  for (const numberColorPair of handfulls) {
    const [number, color] = numberColorPair.split(" ");
    gameObj[color].push(+number);
  }

  return gameObj;
};

const inputToArray = (input) => {
  const lineSeparated = input.split("\n").filter((i) => i !== "");
  return lineSeparated.map((line) => lineToObj(line));
};

const gradeGame = ({ red, green, blue, gameNumber }) =>
  red.some((n) => n > maxRed) ||
  green.some((n) => n > maxGreen) ||
  blue.some((n) => n > maxBlue)
    ? 0
    : gameNumber;

const findMaxes = ({ red, green, blue }) => ({
  red: Math.max(...red),
  green: Math.max(...green),
  blue: Math.max(...blue),
});

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const failedGameNumbers = inputToArray(input).map((game) => gradeGame(game));
const answer = failedGameNumbers.reduce((a, b) => a + b, 0);
console.log(answer);

const gamesWithFewestPossibleColors = inputToArray(input).map((game) =>
  findMaxes(game),
);
const answer2 = gamesWithFewestPossibleColors
  .map(({ red, green, blue }) => red * green * blue)
  .reduce((a, b) => a + b, 0);
console.log(answer2);
