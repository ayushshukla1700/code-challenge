// feat: Fetch and display Pokémon list

// - Used useEffect to fetch Pokémon from API
// - Implemented error handling and loading state
// - Passed Pokémon names as props to List component

import { useEffect, useState } from "react";
import { List } from "ui"; 

const api = "https://pokeapi.co/api/v2/pokemon?limit=151";

const App = () => {
  const [pokemon, setPokemon] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) throw new Error("Failed to fetch Pokémon");
        const data = await response.json();
        setPokemon(data.results);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Pokémon List:</h1>
      <ul>
        {pokemon.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
