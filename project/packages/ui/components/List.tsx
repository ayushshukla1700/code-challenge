// Implement grid layout for List component with responsive design


type ListProps = {
  items: string[];
};

const useStyles = () => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '16px',
    padding: 0,
    margin: 0,
    listStyle: 'none',
    width: '100%',
    maxWidth: '1200px',
  } as React.CSSProperties,
  
  item: {
    background: '#ffffff',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    textTransform: 'capitalize',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    }
  } as React.CSSProperties,
});

export const List = ({ items }: ListProps) => {
  const styles = useStyles();
  
  return (
    <ul style={styles.container}>
      {items.map((item) => (
        <li key={item} style={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
};
