import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPokemonList, removePokemon } from "./store";

interface Pokemon {
  id: number;
  name: string;
}

interface RootState {
  pokemon: {
    list: Pokemon[];
  };
}

const api = "https://pokeapi.co/api/v2/pokemon?limit=151";

const App = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state: RootState) => state.pokemon.list);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) throw new Error("Failed to fetch Pokémon");
        const data = await response.json();
        dispatch(
          setPokemonList(
            data.results.map((p: { name: string }, index: number) => ({
              id: index + 1,
              name: p.name,
            }))
          )
        );
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
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Pokémon List:</h1>
      {pokemon.length > 0 ? (
        <ul>
          {pokemon.map((p: Pokemon) => (
            <li key={p.id}>
              {p.name}
              <button onClick={() => dispatch(removePokemon(p.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Pokémon available.</p>
      )}
    </>
  );
};

export default App;
