import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function PlanetCard({ planet }) {
  const [status, setStatus] = useState(true);
  const handleClick = () => {
    setStatus((preState) => !preState);
  };

  const img =
    planet.url.slice(-3) === "jpg"
      ? planet.url
      : "../assets/img-not-available.jpg";

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-image">
          <img src={img} alt={planet.titel} />
        </div>
        <div class="card-title">
          <p>{planet.title}</p>
        </div>
        <p>By: {planet.copyright ? planet.copyright : "Unknown"}</p>
        <div className="card-btn">
          <IconButton onClick={handleClick}>
            {status ? (
              <FavoriteBorderIcon aria-label="Unlike" />
            ) : (
              <FavoriteIcon aria-label="Like" />
            )}
          </IconButton>
        </div>
        <p className="card-text">{planet.explanation}</p>
      </div>
    </div>
  );
}
