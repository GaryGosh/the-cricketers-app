import { createSearchParams } from "react-router-dom";

export const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
  const daysDiff = currentDate.getDate() - birthDate.getDate();

  // Adjust age if birth date has not occurred this year yet
  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    return yearsDiff - 1;
  }

  return yearsDiff;
};

export const getUrl = ({ queries = {}, add, remove = [] }) => {
  const existingQueries = queries.toString();
  const copyQueries = {};

  existingQueries.split("&").forEach((item) => {
    const queryPair = item.split("=");
    copyQueries[queryPair[0]] = queryPair[1];
  });

  Object.keys(add || {}).map((key) => {
    if (queries) {
      copyQueries[key] = add[key];
    }
  });

  remove.map((key) => {
    copyQueries && copyQueries[key] && delete copyQueries[key];
  });

  return createSearchParams(copyQueries);
};

export const appendRank = (data) => {
  return data
    .sort((a, b) => {
      const aPoints = a.points ?? 0;
      const bPoints = b.points ?? 0;

      return aPoints === bPoints ? 0 : bPoints > aPoints ? 1 : -1;
    })
    .map((it, index) => ({
      ...it,
      rank: index + 1,
    }));
};
