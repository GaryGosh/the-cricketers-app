import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPlayerById } from "../../utils/getPlayers";
import "./PlayerDetailScreen.css";
import { Spin } from "antd";
import PlayerIcon from "../../assets/player.svg";
import at from "v-at";
import { playerType } from "../../constants/constants";
import { calculateAge } from "../../utils/utils";
import { ArrowLeftOutlined } from "@ant-design/icons";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function PlayerDetailScreen() {
  const queries = useQuery();
  const navigate = useNavigate();

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

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="back-btn">
        <ArrowLeftOutlined
          style={{ color: "#8a9cff", fontWeight: "bolder", fontSize: "18px" }}
          onClick={() => goBack()}
        />
      </div>
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
    </>
  );
}

export default PlayerDetailScreen;
