import { readFileSync } from "fs";

export default function () {
  const day1 = readFileSync("inputs/day2.txt");
  const data = day1.toString().split("\n");
  // clear blank last line
  if (!data[data.length - 1]) {
    data.pop();
  }
  let safeReports = 0;
  data.forEach((report) => {
    const levels = report.split(" ").map((level) => parseInt(level));
    const failed = check(levels);
    if (!failed) {
      safeReports++;
    }
  });
  console.log(safeReports);
}

export function safeIncrease(previousLevel, currentLevel) {
  if (currentLevel < previousLevel) {
    return false;
  }
  if (
    Math.abs(previousLevel - currentLevel) > 3 ||
    previousLevel === currentLevel
  ) {
    return false;
  }
  return true;
}

export function safeDecrease(previousLevel, currentLevel) {
  if (currentLevel > previousLevel) {
    return false;
  }
  if (
    Math.abs(previousLevel - currentLevel) > 3 ||
    previousLevel === currentLevel
  ) {
    return false;
  }
  return true;
}

function check(levels, salvageCheck = false) {
  const initialDirection =
    levels[0] - levels[1] < 0 ? "increasing" : "decreasing";
  let failed = false;
  levels.forEach((level, i) => {
    if (i === 0) {
      // noop
    } else {
      if (initialDirection === "increasing") {
        if (!safeIncrease(levels[i - 1], level)) {
          failed = true;
        }
      } else {
        if (!safeDecrease(levels[i - 1], level)) {
          failed = true;
        }
      }
    }
  });
  if (failed && !salvageCheck) {
    return !salvageable(levels);
  }
  return failed;
}

function salvageable(levels) {
  let failed = true;
  // remove each level 1 at a time and see if the resulting array is valid.
  for (let index = 0; index < levels.length; index++) {
    const newLevels = [...levels];
    newLevels.splice(index, 1);
    failed = check(newLevels, true);
    if (!failed) {
      return true;
    }
  }
}
