import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPlayerById } from "../../utils/getPlayers";
import "./PlayerDetailScreen.css";
import { Spin } from "antd";
import PlayerIcon from "../../assets/player.svg";
import at from "v-at";
import { playerType } from "../../constants/constants";
import { calculateAge } from "../../utils/utils";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function PlayerDetailScreen() {
  const queries = useQuery();

  const [playerId, setPlayerId] = useState(queries.get("playerId") || null);
  const [playerData, setPlayerData] = useState({});

  useEffect(() => {
    if (playerId) {
      getPlayerById(playerId)
        .then((result) => {
          console.log(result);
          setPlayerData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [playerId]);

  return (
    <div className="player-detail">
      {playerData ? (
        <>
          <div className="player-info">
            <h2 className="name">{playerData.name}</h2>
            <p className="player-description">{playerData.description}</p>

            <div className="player-chips-wrapper">
              {at(playerData, "type") && (
                <div className="info-container">
                  <p>Type</p>
                  <div className="player-chip">
                    {playerType[playerData.type]}
                  </div>
                </div>
              )}
              <div className="info-container">
                <p>Points</p>
                <div className="player-chip">{playerData.points}</div>
              </div>
              <div className="info-container">
                <p>Age</p>
                <div className="player-chip">
                  {calculateAge(playerData.dob)}
                </div>
              </div>
            </div>
          </div>
          <div className="player-image">
            {playerData.picUrl ? (
              <img
                className="img"
                src={playerData.picUrl}
                alt={playerData.name}
              />
            ) : (
              <img
                src={PlayerIcon}
                alt="icon"
                style={{ height: "500px", width: "500px" }}
              />
            )}
          </div>
        </>
      ) : (
        <div className="loader-wrapper">
          <Spin size="large" />
          <p>Loading player data</p>
        </div>
      )}
    </div>
  );
}

export default PlayerDetailScreen;
