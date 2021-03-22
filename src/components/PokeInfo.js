import React, { useEffect, useState } from "react";
import capitalize from "../utils/capitalize";
import { useParams } from "react-router-dom";
const PokeInfo = () => {
  const [ability, setAbility] = useState([]);
  const [name, setName] = useState();
  const [height, setHeight] = useState(); // in cms
  const [weight, setWeight] = useState(); // divide by 10 to get kg
  const [movesList, setMovesList] = useState([]);
  const [imageURL, setImageURL] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const response = await fetch(URL);
      const data = await response.json();

      const { abilities, forms, height, weight, moves, sprites } = data;
      const {
        other: {
          dream_world: { front_default },
        },
      } = sprites;

      //   console.log(front_default);

      //   console.log(abilities);
      setHeight(height);
      setWeight(weight / 10);
      setName(forms[0].name);
      setAbility(abilities);
      setMovesList(moves);
      setImageURL(front_default);
    };

    fetchData();
  }, [id]);
  //   console.log(id);
  //   console.log("Moves List: ", movesList.moves);

  return (
    <div className="info-body">
      <div className="attribute-block">
        <img src={imageURL} alt="pokemon" />
        <div className="attribute-info">
          <span className="title-tag">{capitalize(`${name}`)}</span>
          <span>
            Height: <span className="attribute-data">{height} cm</span>
          </span>
          <span>
            Weight: <span className="attribute-data">{weight} kg</span>
          </span>
          <div className="flex-list-row">
            Abilities:
            {ability.map((item, index) => (
              <span className="attribute-data ability-tag" key={index}>
                {item.ability.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <details className="moves">
        <summary className="title-tag">Moves ( {movesList.length} )</summary>
        <div className="flex-list-row">
          {movesList.map((item, index) => {
            return (
              <span className="moves-tag" key={index}>
                {item.move.name}
              </span>
            );
          })}
        </div>
      </details>
    </div>
  );
};

export default PokeInfo;
