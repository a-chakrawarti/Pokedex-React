import React, { useEffect, useState } from "react";
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
    <>
      <div>
        <img src={imageURL} alt="pokemon" />
      </div>
      <div>
        <h3>{name}</h3>
        <h3>Height: {height} cm </h3>
        <h3>Weight: {weight} kg</h3>
        <h3>
          Abilities:
          {ability.map((item, index) => (
            <span key={index}>{item.ability.name}</span>
          ))}
        </h3>
      </div>
      <div>
        <h2>Moves</h2>
        <ul>
          {movesList.map((item, index) => {
            return <li key={index}>{item.move.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default PokeInfo;
