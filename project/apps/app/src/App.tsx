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

// Question 7: Explain the use of useEffect hook in React.
// useEffect is used to perform side effects in functional components, 
// such as fetching data, manipulating the DOM, or subscribing to events. 
// It runs after the render phase, and you can control when it runs by passing dependency arrays.


// Question 8: What is a Higher Order Component (HOC)?
// A Higher Order Component (HOC) is a function that takes a component and returns a new component
//  with additional props or behavior. It's used for reusing logic across different components.


// Question 9: What use cases would a HOC be useful for?
// HOCs are useful for adding shared functionality like authentication checks, 
// logging, or data fetching to multiple components without duplicating code. 
// They also allow for conditionally rendering components or adding lifecycle methods.


// Question 10: What does it indicate when a component is prefixed with use?
// Components prefixed with use generally indicate a custom hook in React. 
// React hooks, such as useState, useEffect, or custom hooks, are functions that manage state, 
// side effects, and other logic in functional components.


// Question 11: What is a Generic type in TypeScript?
// A Generic type allows you to write functions, classes, 
// or interfaces that work with any data type while maintaining type safety. 
// It’s defined with angle brackets (e.g., <T>) and enables the flexibility to specify types at runtime.


// Question 12: What’s the difference between a controlled and uncontrolled input in React?
// A controlled input has its value controlled by React state (via value and onChange), 
// while an uncontrolled input manages its own state internally and is accessed via a ref.