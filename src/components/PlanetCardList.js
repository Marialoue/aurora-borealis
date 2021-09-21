import PlanetCard from "./PlanetCard";

const PlanetCardList = (data) => {
  return (
    <ul className="cards">
      {data.data.map((planet, i) => (
        <li className="cards-item">
          <PlanetCard key={planet.i} planet={planet} />
        </li>
      ))}
    </ul>
  );
};

export default PlanetCardList;
