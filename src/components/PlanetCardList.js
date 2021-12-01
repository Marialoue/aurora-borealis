import PlanetCard from "./PlanetCard";

const PlanetCardList = (data) => {
  return (
    <ul className="cards">
      {data.data.map((planet) => (
        <li className="cards-item" key={planet.date} >
          <PlanetCard planet={planet} />
        </li>
      ))}
    </ul>
  );
};

export default PlanetCardList;
