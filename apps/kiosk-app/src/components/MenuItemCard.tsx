import { type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuItemCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

const styles: Record<string, CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    minHeight: 240,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeholder: {
    fontSize: 48,
    color: '#ccc',
  },
  content: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
    lineHeight: 1.3,
  },
  description: {
    fontSize: 16,
    color: '#666',
    margin: 0,
    lineHeight: 1.4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  price: {
    fontSize: 22,
    fontWeight: 700,
    color: '#e63946',
    margin: 0,
    marginTop: 'auto',
  },
};

export const MenuItemCard = ({
  id,
  name,
  price,
  image,
  description,
}: MenuItemCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${id}`);
  };

  return (
    <div
      style={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${name}, $${price.toFixed(2)}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div style={styles.imageContainer}>
        {image ? (
          <img src={image} alt={name} style={styles.image} />
        ) : (
          <span style={styles.placeholder}>&#127860;</span>
        )}
      </div>
      <div style={styles.content}>
        <h3 style={styles.name}>{name}</h3>
        {description && <p style={styles.description}>{description}</p>}
        <p style={styles.price}>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};
