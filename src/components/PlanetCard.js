import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function PlanetCard({ planet }) {
  const [status, setStatus] = useState(true);
  const handleClick = () => {
    setStatus((preState) => !preState);
  };

  return (
    <div className="card">
      <div className="card-content">
        <div class="card-image">
          <img src={planet.url} alt={planet.title} />
        </div>
        <div class="card-title">
          <p>{planet.title}</p>
        </div>
        <button class="card-btn">
          <IconButton onClick={handleClick}>
            {status ? (
              <FavoriteBorderIcon aria-label="Unlike" />
            ) : (
              <FavoriteIcon aria-label="Like" />
            )}
          </IconButton>
        </button>
        <p>By: {planet.copyright ? planet.copyright : "Unknown"}</p>
        <p class="card__text">{planet.explanation}</p>
      </div>
    </div>
  );
}
