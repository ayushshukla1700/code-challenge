// feat: Update <List /> component to display Pokémon names

// - Modified List to accept an array of items as props
// - Passed Pokémon names from App.tsx to List
// - Ensured type safety with TypeScript



import React from "react";

type ListProps = { items: string[] };

export const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item: string) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
