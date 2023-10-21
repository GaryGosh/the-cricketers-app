import React from "react";
import { calculateAge } from "../utils/utils";

function PlayerList({ player = {} }) {
  return (
    <div key={player?.id}>
      <div>{player?.name}</div>
      <div>{player?.type}</div>
      <div>{player?.points}</div>
      <div>{player?.rank}</div>
      <div>{calculateAge(player?.dob)}</div>
    </div>
  );
}

export default PlayerList;
