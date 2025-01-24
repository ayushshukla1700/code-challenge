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
  },
});

// Export actions
export const { setPokemonList } = pokemonSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

export default store;


// Answer 4: Difference Between createSlice in Redux Toolkit and a Traditional Reducer in Redux

// createSlice in Redux Toolkit simplifies state management by combining
//  reducers, actions, and initial state in a single function. In contrast, 
//  a traditional Redux reducer is a pure function that takes the current state and an action,
//  then returns a new state but requires separate action types and action creators.

// Key differences:
// Less Boilerplate: createSlice automatically generates action creators and action types.
// Mutable Code with Immer: Allows writing "mutating" logic internally, but it uses Immer to keep the state immutable.
// Encapsulation: Combines reducers and actions into one slice for better organization.


// Answer 5: Benefits of Immutable Code

// Predictability: Prevents unintended side effects and makes debugging easier.
// Time-Travel Debugging: Enables features like undo/redo and state inspection.
// Performance Optimization: Helps in performance improvements with React’s shouldComponentUpdate
//  or useSelector memoization.
// Concurrency Safety: Reduces bugs in multi-threaded environments by avoiding state mutation.
