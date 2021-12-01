import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function PlanetCard({ planet }) {
  const [status, setStatus] = useState(true);
  const handleClick = () => {
    setStatus((preState) => !preState);
  };

  // const img =
  //   planet.url.slice(-3) === "jpg"
  //     ? planet.url
  //     : "../assets/img-not-available.jpg";

  const imgOrVid = () => {
    if (planet.media_type === "image")
      return <img src={planet.url} alt={planet.title} />;
    else if (planet.media_type === "video")
      return (
        <iframe title={planet.title} src={planet.url} alt={planet.title} />
      );
  };

  return (
    <section className="card">
      <div className="card-content">
        <div className="card-image">{imgOrVid()}</div>
        <div className="card-title">
          <p>{planet.title}</p>
        </div>
        <p>By: {planet.copyright ? planet.copyright : "Unknown"}</p>
        <p>Date: {planet.date}</p>
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
    </section>
  );
}
