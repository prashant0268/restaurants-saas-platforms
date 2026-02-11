interface HeaderProps {
  restaurantName?: string;
}

export const Header = ({ restaurantName = 'My Restaurant' }: HeaderProps) => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h3 style={styles.restaurantName}>{restaurantName}</h3>
      </div>
      <div style={styles.right}>
        <button style={styles.notifButton}>Notifications</button>
        <div style={styles.avatar}>O</div>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    height: 60,
    backgroundColor: '#fff',
    borderBottom: '1px solid #E5E5E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  restaurantName: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  notifButton: {
    background: 'none',
    border: '1px solid #E5E5E5',
    borderRadius: 6,
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: 13,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: '#FF6B35',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 600,
  },
};
