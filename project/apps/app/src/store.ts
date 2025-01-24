import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pokemon {
  id: number;
  name: string;
  type: string;
}

interface PokemonState {
  list: Pokemon[];
}

const initialState: PokemonState = {
  list: [],
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setPokemonList: (state, action: PayloadAction<Pokemon[]>) => {
          state.list = action.payload;
        },
        removePokemon: (state, action: PayloadAction<number>) => {
          state.list = state.list.filter(pokemon => pokemon.id !== action.payload);
        },
      }
  });
  
 
  

// Export actions
export const { setPokemonList, removePokemon } = pokemonSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

export default store;


// Question 6: How Can You Verify the Action Has Been Dispatched?

// Method 1: Use Redux DevTools
// Open Redux DevTools in the browser.
// Check the Actions tab to see if removePokemon is dispatched.
// Confirm the State changes as expected.

// Method 2: Add a console.log in a Middleware
// Modify store.ts to add a middleware:
// Open the browser console and check if the action appears.

//  Method 3: Use useEffect in a Component
// Add a log to check the state change:

