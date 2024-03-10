import { useEffect, useState } from 'react';
import './App.css';

const baseUrl = 'https://pokeapi.co/api/v2';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);

  useEffect(
    () => {
      async function getPokemon() {
        const response = await fetch(`${baseUrl}/pokemon/${pokemonId}`, { method: 'GET' });
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
        <button type="button" onClick={decrementPokemonId}>Previous</button>
        {pokemonData !== null ? (
          <div>
            <img src={pokemonData.sprites.front_default} alt={`front facing ${pokemonData.name}`} />
            <h2>{pokemonData.name}</h2>
          </div>
        ) : <span>Loading...</span>}
        <button type="button" onClick={incrementPokemonId}>Next</button>
      </main>
    </div>
  );
}

export default App;
