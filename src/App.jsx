import { useEffect, useState } from 'react';
import './App.css';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';

const baseUrl = 'https://pokeapi.co/api/v2';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonMoves, setPokemonMoves] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);

  useEffect(
    () => {
      async function getPokemon() {
        const response = await fetch(`${baseUrl}/pokemon/${pokemonId}`, { method: 'GET' });
        // console.log(response.url);
        const pokemon = await response.json();
        setPokemonData(pokemon);
      }
      async function getPokemonMoves() {
        const moveResponse = await fetch(`${baseUrl}/move/${pokemonId}`, { method: 'GET' });
        console.log(moveResponse.url);
        const moves = await moveResponse.json();
        setPokemonMoves(moves.name);
      }
      setPokemonData(null);
      getPokemon();
      setPokemonMoves(null);
      getPokemonMoves();
    },
    [pokemonId],
  );

  const decrementPokemonId = () => {
    setPokemonId((prevPokemonId) => prevPokemonId - 1);
  };
  const incrementPokemonId = () => {
    setPokemonId((prevPokemonId) => prevPokemonId + 1);
  };
  /*
  const allPokemonMoves = () => {
    for (const allMoves in pokemonData.moves) {
      const allPokemonMoves = allMoves;

  } */
  return (

    <div>
      <h1>PokeDex</h1>
      <main>
        <TfiAngleLeft className="icons" type="button" onClick={decrementPokemonId} />
        {pokemonData !== null ? (
          <div>
            <div className="pokemon-name-container">
              <img src={pokemonData.sprites.front_default} alt={`front facing ${pokemonData.name}`} />
              <h2>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
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
                    through
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
