import data from "../players";
import { appendRank } from "./utils";

export const getPlayers = (args) => {
  console.log("args to fetch ", args);
  return new Promise((resolve) => {
    let sortedData = data;

    sortedData = appendRank(sortedData);

    if (args?.searchKeyword) {
      const nameFilter = args.searchKeyword.toLowerCase();
      sortedData = sortedData.filter((player) =>
        player.name.toLowerCase().includes(nameFilter)
      );
    }

    // Sort the data based on the sort payload
    if (args?.sortBy === "name") {
      sortedData = sortedData.sort((a, b) =>
        args.isDescending
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name)
      );
    } else if (args?.sortBy === "rank") {
      sortedData = sortedData.sort((a, b) =>
        args.isDescending ? b.rank - a.rank : a.rank - b.rank
      );
    } else if (args?.sortBy === "age") {
      sortedData = sortedData.sort((a, b) =>
        args.isDescending ? a.dob - b.dob : b.dob - a.dob
      );
    } else {
      sortedData = sortedData.sort((a, b) => {
        const aPoints = a.points ?? 0;
        const bPoints = b.points ?? 0;

        if (args.isDescending) {
          return aPoints === bPoints ? 0 : aPoints < bPoints ? 1 : -1;
        } else {
          return aPoints === bPoints ? 0 : aPoints > bPoints ? 1 : -1;
        }
      });
    }

    // Filter based on the type
    if (args?.type) {
      sortedData = sortedData.filter((it) => it.type === args.type);
    }

    // Calculate pagination values
    const pageSize = 10;
    const page = args?.page || 1;
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get the data for the current page
    const pagedData = sortedData.slice(startIndex, endIndex);

    resolve({
      total: sortedData.length,
      page,
      pageSize,
      totalPages: totalPages,
      data: pagedData,
    });
  });
};

export const getPlayerById = (playerId) => {
  return new Promise((resolve) => {
    const player = data.find((player) => player.id === playerId);
    resolve(player);
  });
};
