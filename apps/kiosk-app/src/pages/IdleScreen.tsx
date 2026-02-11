import { type CSSProperties, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const promoSlides = [
  {
    title: 'Fresh & Delicious',
    subtitle: 'Made with the finest ingredients',
    bgColor: '#e63946',
  },
  {
    title: 'Daily Specials',
    subtitle: 'Check out our chef\'s selections',
    bgColor: '#457b9d',
  },
  {
    title: 'Family Combos',
    subtitle: 'Great value for everyone',
    bgColor: '#2a9d8f',
  },
];

const styles: Record<string, CSSProperties> = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    touchAction: 'manipulation',
  },
  slideContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    zIndex: 1,
    padding: 48,
    textAlign: 'center',
  },
  promoTitle: {
    fontSize: 64,
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  promoSubtitle: {
    fontSize: 28,
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.9)',
    margin: 0,
  },
  ctaButton: {
    marginTop: 48,
    padding: '28px 72px',
    fontSize: 32,
    fontWeight: 700,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    border: 'none',
    borderRadius: 24,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    touchAction: 'manipulation',
    letterSpacing: 1,
  },
  dots: {
    position: 'absolute',
    bottom: 48,
    display: 'flex',
    gap: 16,
    zIndex: 1,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  },
  dotActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  },
};

export const IdleScreen = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = promoSlides[currentSlide];

  const handleStartOrder = () => {
    navigate('/menu');
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: slide.bgColor,
        transition: 'background-color 0.8s ease',
      }}
      onClick={handleStartOrder}
      role="button"
      tabIndex={0}
      aria-label="Touch to start your order"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleStartOrder();
        }
      }}
    >
      <div style={styles.slideContent}>
        <h1 style={styles.promoTitle}>{slide.title}</h1>
        <p style={styles.promoSubtitle}>{slide.subtitle}</p>
        <button
          style={styles.ctaButton}
          onClick={(e) => {
            e.stopPropagation();
            handleStartOrder();
          }}
          aria-label="Touch to order"
        >
          Touch to Order
        </button>
      </div>
      <div style={styles.dots}>
        {promoSlides.map((_, idx) => (
          <button
            key={idx}
            style={idx === currentSlide ? styles.dotActive : styles.dot}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
