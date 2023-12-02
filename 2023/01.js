import input from "./01-input.txt";

const digitRegex = /\d|one|two|three|four|five|six|seven|eight|nine/g;

const digitMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const lineToValue = (line) => {
  if (line === "") return 0;

  const matches = line.match(digitRegex);
  const digits = matches.map((i) => digitMap[i] ?? i);

  return +(digits[0] + digits[digits.length - 1]);
};

const inputToAnswer = (input) =>
  input
    .split("\n")
    .map(lineToValue)
    .reduce((a, b) => a + b, 0);

const answer = inputToAnswer(input);

console.log(answer);
