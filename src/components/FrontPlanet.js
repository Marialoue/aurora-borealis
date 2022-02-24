import { useEffect, useState } from "react";

import PlanetCard from "./PlanetCard";

export default function FrontPlanet() {
  const [data, setData] = useState();
  const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=atb1JLFnGOLmjT4TykPmHQSBYxdaGXTs6qct0Ali`;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let response = await fetch(baseUrl);
      if (response.ok) {
        let res = await response.json();
        setData(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <section>{data && <PlanetCard planet={data} />}</section>;
}
