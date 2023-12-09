import input from "./04-input.txt";

// const sampleInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const lineToCardObject = (line) => {
  const numbersStr = line.split(":").map((i) => i.trim())[1];
  const [winningNumbers, numbersYouHave] = numbersStr
    .split("|")
    .map((i) => i.trim())
    .map((i) => i.match(/\d+/g).map((i) => +i));

  return { winningNumbers, numbersYouHave };
};

const getIntersectionLength = (arr1, arr2) =>
  arr1.filter((n) => arr2.includes(n)).length;

const arrayOfCardObjects = input
  .split("\n")
  .filter((i) => i !== "")
  .map((line) => lineToCardObject(line));

const arrayOfIntersectionLengths = arrayOfCardObjects.map(
  ({ winningNumbers, numbersYouHave }) =>
    getIntersectionLength(winningNumbers, numbersYouHave),
);

const answer = arrayOfIntersectionLengths
  .filter((n) => n > 0)
  .map((n) => 2 ** (n - 1))
  .reduce((a, b) => a + b, 0);

console.log(answer);
