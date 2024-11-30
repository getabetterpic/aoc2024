import { readFileSync } from "fs";

export default function () {
  const day1 = readFileSync("inputs/day1.txt");
  const lines = day1.toString().split("\n");
  lines.pop();
  const pairs = lines.map((line) =>
    line.split("   ").map((element) => element.trim())
  );
  const left = pairs.map((pair) => pair[0]).sort();
  const right = pairs.map((pair) => pair[1]).sort();
  const diffs = [];
  while (left.length) {
    const leftInt = parseInt(left.pop());
    const rightInt = parseInt(right.pop());
    diffs.push(Math.abs(leftInt - rightInt));
  }
  console.log(diffs.reduce((accum, val) => accum + val, 0));
}

export const part2 = function () {
  const day1 = readFileSync("inputs/day1.txt");
  const lines = day1.toString().split("\n");
  lines.pop();
  const pairs = lines.map((line) =>
    line.split("   ").map((element) => element.trim())
  );
  const left = pairs.map((pair) => pair[0]);
  const right = pairs.map((pair) => pair[1]);
  const similarityScores = [];
  left.forEach((item) => {
    const instances = right.filter((instance) => item === instance);
    similarityScores.push([item, instances.length]);
  });
  console.log(
    similarityScores.reduce(
      (accum, [score, cardinality]) => accum + score * cardinality,
      0
    )
  );
};
