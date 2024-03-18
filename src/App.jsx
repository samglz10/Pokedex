import { useEffect, useState } from 'react';
import './App.css';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';

const baseUrl = 'https://pokeapi.co/api/v2';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);

  useEffect(
    () => {
      async function getPokemon() {
        if (pokemonId < 1) {
          setPokemonId(1);
        }
        const response = await fetch(`${baseUrl}/pokemon/${pokemonId}`, { method: 'GET' });
        // console.log(response.url);
        const pokemon = await response.json();
        setPokemonData(pokemon);
      }
      setPokemonData(null);
      getPokemon();
    },
    [pokemonId],
  );

  const decrementPokemonId = () => {
    setPokemonId((prevPokemonId) => prevPokemonId - 1);
  };
  const incrementPokemonId = () => {
    setPokemonId((prevPokemonId) => prevPokemonId + 1);
  };

  return (

    <div>
      <h1>PokeDex</h1>
      <main>
        <TfiAngleLeft className="icons" type="button" onClick={decrementPokemonId} />
        {pokemonData !== null ? (
          <div>
            <div className="pokemon-name-container">
              <img src={pokemonData.sprites.front_default} alt={`front facing ${pokemonData.name}`} />
              <h2> 
                {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
                {' '}
              </h2>
             {/**  <span>
                {pokemonData.types[0].type.name}
                {' '}
                and
                {' '}
                {pokemonData.types[1].type.name}
                {' '}
                type
              </span>
              */}
            </div>
            <h3>Movesets</h3>
            <div className="moveset-container">
              <ol>
                {pokemonData.moves.map((move, index) => (
                  <li key={index} className="move">
                    {move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)}
                    {' '}
                    can be learned at Level
                    {' '}
                    {move.version_group_details[0].level_learned_at}
                    {' '}
                    by
                    {' '}
                    {move.version_group_details[0].move_learn_method.name}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : <span>Loading...</span>}
        <TfiAngleRight className="icons" type="button" onClick={incrementPokemonId} />
      </main>
    </div>
  );
}

export default App;
