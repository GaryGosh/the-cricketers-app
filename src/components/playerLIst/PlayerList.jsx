import React from "react";
import { calculateAge } from "../../utils/utils";
import "./PlayerList.css";
import { Col, Row } from "antd";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function PlayerList({ player = {} }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queries = useQuery();

  const goToDetailedView = (data) => {
    navigate({
      pathname: "/player-detail",
      search: `?${createSearchParams({ user: data.id })}`,
    });
  };

  return (
    <div
      className="list-wrapper"
      key={player?.id}
      onClick={() => goToDetailedView(player)}
    >
      <Row gutter={[16, 16]} className="align-center">
        <Col span={6}>
          <div className="player-name">{player?.name}</div>
          {player?.type && <div className="type-chip">{player?.type}</div>}
        </Col>
        <Col span={6}>
          <div className="list-text">{`# ${player?.rank}`}</div>
        </Col>
        <Col span={6}>
          <div className="list-text">{player?.points}</div>
        </Col>
        <Col span={6}>
          <div className="list-text">{calculateAge(player?.dob)}</div>
        </Col>
      </Row>
    </div>
  );
}

export default PlayerList;
