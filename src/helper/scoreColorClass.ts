import { getGames, getScoreThresholds, getTimeThresholds } from "@/data/games";

export default function getScoreColorClass(
  score: string,
  gameName: string
): string {
  const scoreType = getGames().find(
    (game) => game.component === gameName
  )?.scoreType;
  if (scoreType === "number") {
    return getIntScoreColorClass(
      parseFloat(score),
      getScoreThresholds(gameName)
    );
  } else if (scoreType === "time") {
    return getTimeScoreColorClass(
      parseFloat(score),
      getTimeThresholds(gameName)
    );
  } else {
    return "color--white";
  }
}

export function getTimeScoreColorClass(
  time: number,
  thresholds: number[]
): string {
  if (time < 0) {
    return "color--red";
  }
  if (time <= thresholds[3]) {
    return "color--violet";
  } else if (time <= thresholds[2]) {
    return "color--blue";
  } else if (time <= thresholds[1]) {
    return "color--green";
  } else if (time <= thresholds[0]) {
    return "color--white";
  } else {
    return "color--red";
  }
}

export function getIntScoreColorClass(
  score: number,
  thresholds: number[]
): string {
  if (score < thresholds[0]) {
    return "color--red";
  } else if (score >= thresholds[0] && score < thresholds[1]) {
    return "color--white";
  } else if (score >= thresholds[1] && score < thresholds[2]) {
    return "color--green";
  } else if (score >= thresholds[2] && score < thresholds[3]) {
    return "color--blue";
  } else if (score >= thresholds[3]) {
    return "color--violet";
  } else {
    return "color--white";
  }
}
