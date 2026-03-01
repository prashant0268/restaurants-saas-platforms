import { useState, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Header } from '../components/layout/Header';
import { mockMenuItems, mockMenuCategories } from '../data/mockDemoData';

type ThemeOption = 'royal' | 'warm' | 'spice';

const TOTAL_PAGES = 2;
const AUTO_ROTATE_MS = 8000;
const COOKING_VIDEO_ID = 'N8XBGuHrzro';

const themeConfigs: Record<
  ThemeOption,
  {
    bg: string;
    text: string;
    accent: string;
    cardBg: string;
    divider: string;
    catBg: string;
    catText: string;
    priceBg: string;
    bannerBg: string;
    bannerText: string;
  }
> = {
  royal: {
    bg: '#1c0a0a',
    text: '#fef3c7',
    accent: '#d4a017',
    cardBg: 'rgba(212,160,23,0.07)',
    divider: 'rgba(212,160,23,0.25)',
    catBg: 'rgba(212,160,23,0.14)',
    catText: '#fbbf24',
    priceBg: 'rgba(212,160,23,0.18)',
    bannerBg: 'linear-gradient(to right, transparent, rgba(212,160,23,0.12), transparent)',
    bannerText: '#d4a017',
  },
  warm: {
    bg: '#fdf6e3',
    text: '#3c1518',
    accent: '#b91c1c',
    cardBg: 'rgba(185,28,28,0.05)',
    divider: '#d4a373',
    catBg: '#fde68a',
    catText: '#92400e',
    priceBg: 'rgba(185,28,28,0.08)',
    bannerBg: 'linear-gradient(to right, transparent, rgba(185,28,28,0.08), transparent)',
    bannerText: '#b91c1c',
  },
  spice: {
    bg: '#7c2d12',
    text: '#fefce8',
    accent: '#fbbf24',
    cardBg: 'rgba(255,255,255,0.07)',
    divider: 'rgba(251,191,36,0.25)',
    catBg: 'rgba(251,191,36,0.16)',
    catText: '#fde68a',
    priceBg: 'rgba(251,191,36,0.2)',
    bannerBg: 'linear-gradient(to right, transparent, rgba(251,191,36,0.12), transparent)',
    bannerText: '#fbbf24',
  },
};

const dietaryColors: Record<string, { bg: string; text: string }> = {
  vegetarian: { bg: '#dcfce7', text: '#166534' },
  vegan: { bg: '#d1fae5', text: '#065f46' },
  'gluten-free': { bg: '#fef3c7', text: '#92400e' },
};

const balanceColumns = <T extends { items: unknown[] }>(cats: T[]): [T[], T[]] => {
  const left: T[] = [];
  const right: T[] = [];
  let lc = 0;
  let rc = 0;
  for (const cat of cats) {
    if (lc <= rc) {
      left.push(cat);
      lc += cat.items.length + 1;
    } else {
      right.push(cat);
      rc += cat.items.length + 1;
    }
  }
  return [left, right];
};

/** Responsive sizing derived from container width */
const getResponsive = (w: number) => {
  const stacked = w < 600;
  const compact = w < 900;
  return {
    stacked,
    compact,
    tvHeight: stacked ? 540 : compact ? 420 : 560,
    bezel: stacked ? 4 : compact ? 5 : 7,
    bezelRadius: stacked ? 10 : compact ? 12 : 14,
    standW: stacked ? 120 : compact ? 140 : 180,
    standH: stacked ? 12 : compact ? 14 : 18,
    baseW: stacked ? 180 : compact ? 220 : 280,
    // fonts
    bannerFont: compact ? '8px' : '10px',
    bannerPad: compact ? '4px 0 3px' : '6px 0 5px',
    bannerLetterSpacing: compact ? '2px' : '4px',
    titleFont: compact ? '13px' : '16px',
    catFont: compact ? '10px' : '12px',
    nameFont: compact ? '9.5px' : '11.5px',
    priceFont: compact ? '9px' : '11px',
    bulletSize: compact ? '4px' : '5px',
    dietaryFont: compact ? '5.5px' : '7px',
    liveBadgeFont: compact ? '7px' : '9px',
    // spacing
    colGap: compact ? '8px' : '14px',
    menuPadX: compact ? '10px' : '16px',
    headerPad: compact ? '4px 10px 3px' : '6px 16px 5px',
    menuRowGap: compact ? '4px' : '5px',
    menuRowPad: compact ? '1px 2px' : '1px 4px',
    // settings
    settingsGap: compact ? '16px' : '32px',
    settingsPad: compact ? '10px 8px' : '16px 0',
  };
};

export const FireTVPage = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('royal');
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuBodyRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [menuBodyH, setMenuBodyH] = useState(0);
  const theme = themeConfigs[selectedTheme];

  // Measure container width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(() => update());
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Measure menu body height for dynamic spacing
  useEffect(() => {
    const el = menuBodyRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setMenuBodyH(entries[0]?.contentRect.height ?? 0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % TOTAL_PAGES);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const r = getResponsive(containerWidth);

  const themeOptions: { key: ThemeOption; label: string }[] = [
    { key: 'royal', label: 'Royal' },
    { key: 'warm', label: 'Warm' },
    { key: 'spice', label: 'Spice' },
  ];

  // Group items by category
  const categories = mockMenuCategories.map((cat) => ({
    ...cat,
    items: mockMenuItems.filter((item) => item.category === cat.id),
  }));

  // 2 pages: first 4 / last 4 categories
  const pages = [categories.slice(0, 4), categories.slice(4)];
  const pageColumns = pages.map((pageCats) => balanceColumns(pageCats));

  // --- Dynamic spacing: fill available menu height evenly ---
  // Max rows per column across all pages (for consistent sizing)
  const maxColRows = Math.max(
    ...pageColumns.flatMap((cols) =>
      cols.map((colCats) =>
        colCats.reduce((n, cat) => n + 1 + cat.items.length, 0)
      )
    )
  );
  // Natural row height (font + minimal padding)
  const naturalRowH = r.compact ? 14 : 17;
  // Target row height to fill available space
  const targetRowH = menuBodyH > 0 && maxColRows > 0
    ? menuBodyH / maxColRows
    : naturalRowH;
  // Extra vertical padding per row to reach target height
  const rowPadV = Math.max(0, (targetRowH - naturalRowH) / 2);
  // Slightly more breathing room between category sections
  const sectionGap = Math.max(0, rowPadV * 1.2);

  // --- Responsive inline styles ---
  const s: Record<string, CSSProperties> = {
    page: { padding: 0 },

    tvOuter: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto 24px',
      padding: r.compact ? '0 8px' : 0,
    },
    tvBezel: {
      borderRadius: `${r.bezelRadius}px`,
      border: `${r.bezel}px solid #111827`,
      overflow: 'hidden',
      boxShadow: r.compact
        ? 'inset 0 0 0 1px #374151, 0 12px 40px rgba(0,0,0,0.4)'
        : 'inset 0 0 0 2px #374151, 0 30px 80px rgba(0,0,0,0.45)',
    },
    tvScreen: {
      display: 'flex',
      flexDirection: 'column',
      height: `${r.tvHeight}px`,
      overflow: 'hidden',
      backgroundColor: theme.bg,
      fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    },
    tvStand: {
      width: `${r.standW}px`,
      height: `${r.standH}px`,
      margin: '0 auto',
      background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
      borderRadius: '0 0 6px 6px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    },
    tvBase: {
      width: `${r.baseW}px`,
      height: '6px',
      margin: '0 auto',
      background: '#1e293b',
      borderRadius: '0 0 8px 8px',
    },

    banner: {
      textAlign: 'center',
      padding: r.bannerPad,
      flexShrink: 0,
      letterSpacing: r.bannerLetterSpacing,
      fontSize: r.bannerFont,
      fontWeight: 700,
      textTransform: 'uppercase',
      background: theme.bannerBg,
      color: theme.bannerText,
      borderBottom: `1px solid ${theme.divider}`,
      fontFamily: "'Playfair Display', Georgia, serif",
    },

    contentRow: {
      display: 'flex',
      flexDirection: r.stacked ? 'column' : 'row',
      flex: 1,
      overflow: 'hidden',
    },

    menuSide: {
      flex: r.stacked ? '0 0 58%' : '0 0 60%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    menuHeader: {
      padding: r.headerPad,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      borderBottom: `1px solid ${theme.divider}`,
    },
    menuTitle: {
      fontSize: r.titleFont,
      fontWeight: 700,
      margin: 0,
      letterSpacing: '0.5px',
      color: theme.text,
      fontFamily: "'Playfair Display', Georgia, serif",
    },
    liveBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: r.liveBadgeFont,
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      padding: r.compact ? '2px 6px' : '3px 8px',
      borderRadius: '4px',
      backgroundColor: theme.cardBg,
      color: theme.text,
    },
    menuBody: {
      flex: 1,
      overflow: 'hidden',
      position: 'relative',
    },
    pageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr',
      gap: `0 ${r.colGap}`,
      padding: `0 ${r.menuPadX}`,
    },
    menuColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'flex-start' as const,
      overflow: 'hidden',
    },
    categorySection: {
      marginTop: `${sectionGap}px`,
    },
    categorySectionFirst: {
      marginTop: `${rowPadV}px`,
    },
    categoryLabel: {
      fontSize: r.catFont,
      fontWeight: 600,
      fontStyle: 'italic',
      letterSpacing: '0.5px',
      margin: 0,
      padding: `${rowPadV}px 6px`,
      borderRadius: '3px',
      display: 'block',
      backgroundColor: theme.catBg,
      color: theme.catText,
      fontFamily: "'Playfair Display', Georgia, serif",
      borderBottom: `1px solid ${theme.divider}`,
    },
    menuRow: {
      display: 'flex',
      alignItems: 'center',
      gap: r.menuRowGap,
      padding: `${rowPadV}px ${r.compact ? '2px' : '4px'}`,
      borderRadius: '4px',
      transition: 'background 0.15s',
      backgroundColor: 'transparent',
    },
    bullet: {
      width: r.bulletSize,
      height: r.bulletSize,
      borderRadius: '50%',
      backgroundColor: theme.accent,
      flexShrink: 0,
      opacity: 0.7,
    },
    menuItemInfo: { flex: 1, minWidth: 0 },
    menuItemName: {
      fontSize: r.nameFont,
      fontWeight: 600,
      margin: 0,
      lineHeight: 1.3,
      color: theme.text,
    },
    menuItemPrice: {
      fontSize: r.priceFont,
      fontWeight: 700,
      padding: '1px 5px',
      borderRadius: '4px',
      flexShrink: 0,
      backgroundColor: theme.priceBg,
      color: theme.accent,
    },
    dietaryTag: {
      fontSize: r.dietaryFont,
      fontWeight: 600,
      padding: '0px 2px',
      borderRadius: '2px',
      display: 'inline-block',
      marginRight: '2px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.2px',
    },

    pageIndicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      padding: r.compact ? '3px 0 2px' : '5px 0 3px',
      flexShrink: 0,
    },
    pageDot: {
      width: r.compact ? '6px' : '7px',
      height: r.compact ? '6px' : '7px',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
    },
    pageLabel: {
      fontSize: r.compact ? '8px' : '9px',
      fontWeight: 600,
      margin: 0,
      marginLeft: '4px',
      opacity: 0.5,
      color: theme.text,
    },

    // Ornate divider — vertical when side-by-side, horizontal when stacked
    dividerWrap: r.stacked
      ? {
          height: '4px',
          width: '100%',
          flexShrink: 0,
          position: 'relative',
          background: `linear-gradient(to right, transparent 5%, ${theme.accent} 25%, ${theme.accent} 75%, transparent 95%)`,
        }
      : {
          width: '4px',
          flexShrink: 0,
          position: 'relative',
          background: `linear-gradient(to bottom, transparent 5%, ${theme.accent} 25%, ${theme.accent} 75%, transparent 95%)`,
        },
    dividerOrnament: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: r.compact ? '8px' : '10px',
      height: r.compact ? '8px' : '10px',
      backgroundColor: '#daa520',
      transform: 'translate(-50%, -50%) rotate(45deg)',
      borderRadius: '2px',
      boxShadow: '0 0 6px rgba(218,165,32,0.5)',
      zIndex: 1,
    },

    videoSide: {
      flex: r.stacked ? '1 1 auto' : '0 0 40%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      minHeight: 0,
    },
    videoContainer: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#000',
      overflow: 'hidden',
    },
    video: {
      width: '100%',
      height: '100%',
      border: 'none',
      display: 'block',
    },
    videoOverlay: {
      position: 'absolute' as const,
      bottom: r.compact ? '8px' : '12px',
      left: r.compact ? '8px' : '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: r.compact ? '4px 8px' : '6px 12px',
      borderRadius: '8px',
      backgroundColor: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(8px)',
    },
    videoOverlayText: {
      fontSize: r.compact ? '9px' : '11px',
      fontWeight: 600,
      color: '#ffffff',
      margin: 0,
    },
    videoOverlayDot: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: '#ef4444',
      boxShadow: '0 0 6px #ef4444',
    },

    settingsBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: r.settingsGap,
      padding: r.settingsPad,
      flexWrap: 'wrap' as const,
    },
    settingGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
    settingLabel: {
      fontSize: r.compact ? '12px' : '13px',
      fontWeight: 600,
      color: '#6b7280',
      margin: 0,
    },
    buttonGroup: { display: 'flex', gap: '4px' },
    themeBtn: {
      padding: r.compact ? '5px 10px' : '6px 14px',
      fontSize: r.compact ? '11px' : '12px',
      fontWeight: 500,
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: '#374151',
      transition: 'all 0.15s',
    },
    themeBtnActive: {
      padding: r.compact ? '5px 10px' : '6px 14px',
      fontSize: r.compact ? '11px' : '12px',
      fontWeight: 600,
      border: '1px solid #b8860b',
      borderRadius: '6px',
      cursor: 'pointer',
      backgroundColor: '#b8860b',
      color: '#ffffff',
    },
    qrSection: { display: 'flex', alignItems: 'center', gap: '10px' },
    qrBox: {
      width: '36px',
      height: '36px',
      border: '2px solid #d4a373',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '9px',
      color: '#b8860b',
      fontWeight: 600,
    },
    qrText: { fontSize: '12px', color: '#6b7280', margin: 0 },
  };

  return (
    <div style={s.page}>
      {/* Classic serif font + animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
        @keyframes dotGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,160,23,0.5); }
          50% { box-shadow: 0 0 0 4px rgba(212,160,23,0); }
        }
      `}</style>

      <Header
        title="Fire TV Display"
        subtitle="Digital menu boards for in-store displays"
      />

      {/* --- TV --- */}
      <div ref={containerRef} style={s.tvOuter}>
        <div style={s.tvBezel}>
          <div style={s.tvScreen}>

            {/* Decorative restaurant banner */}
            <div style={s.banner}>
              ✦ &nbsp; POOJA EXOTIC INDIAN CUISINE &nbsp; ✦
            </div>

            {/* Content: menu + video */}
            <div style={s.contentRow}>

              {/* Menu */}
              <div style={s.menuSide}>
                <div style={s.menuHeader}>
                  <h2 style={s.menuTitle}>Our Menu</h2>
                  <span style={s.liveBadge}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
                    Live
                  </span>
                </div>

                {/* Animated crossfade pages */}
                <div ref={menuBodyRef} style={s.menuBody}>
                  {pageColumns.map((cols, pageIdx) => (
                    <div
                      key={pageIdx}
                      style={{
                        ...s.pageOverlay,
                        opacity: pageIdx === currentPage ? 1 : 0,
                        transform: pageIdx === currentPage ? 'translateX(0)' : 'translateX(30px)',
                        transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
                        pointerEvents: pageIdx === currentPage ? 'auto' : 'none',
                      }}
                    >
                      {cols.map((colCats, colIdx) => (
                        <div key={colIdx} style={s.menuColumn}>
                          {colCats.map((cat, catIdx) => (
                            <div key={cat.id} style={catIdx === 0 ? s.categorySectionFirst : s.categorySection}>
                              <span style={s.categoryLabel}>
                                {cat.name}
                              </span>
                              {cat.items.map((item) => (
                                <div
                                  key={item.id}
                                  style={s.menuRow}
                                  onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.backgroundColor = theme.cardBg;
                                  }}
                                  onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <span style={s.bullet} />
                                  <div style={s.menuItemInfo}>
                                    <p style={s.menuItemName}>
                                      {item.name}
                                      {item.dietary.length > 0 && (
                                        <span style={{ marginLeft: '3px' }}>
                                          {item.dietary.map((d) => (
                                            <span
                                              key={d}
                                              style={{
                                                ...s.dietaryTag,
                                                backgroundColor: dietaryColors[d]?.bg ?? '#f3f4f6',
                                                color: dietaryColors[d]?.text ?? '#6b7280',
                                              }}
                                            >
                                              {d === 'gluten-free' ? 'GF' : d === 'vegetarian' ? 'V' : d === 'vegan' ? 'VG' : d.toUpperCase()}
                                            </span>
                                          ))}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                  <span style={s.menuItemPrice}>
                                    ${item.price.toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Page indicator */}
                <div style={s.pageIndicator}>
                  {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                    <span
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      style={{
                        ...s.pageDot,
                        backgroundColor: i === currentPage ? theme.accent : theme.divider,
                        transform: i === currentPage ? 'scale(1.4)' : 'scale(1)',
                        animation: i === currentPage ? 'dotGlow 2s ease-in-out infinite' : 'none',
                      }}
                    />
                  ))}
                  <p style={s.pageLabel}>
                    {currentPage + 1} / {TOTAL_PAGES}
                  </p>
                </div>
              </div>

              {/* Ornate divider */}
              <div style={s.dividerWrap}>
                <div style={s.dividerOrnament} />
              </div>

              {/* Video */}
              <div style={s.videoSide}>
                <div style={s.videoContainer}>
                  <iframe
                    style={s.video}
                    src={`https://www.youtube.com/embed/${COOKING_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${COOKING_VIDEO_ID}&controls=0&showinfo=0&modestbranding=1&rel=0`}
                    title="Kitchen Cam"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                  <div style={s.videoOverlay}>
                    <span style={s.videoOverlayDot} />
                    <p style={s.videoOverlayText}>Live Kitchen Cam</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gold TV Stand */}
        <div style={s.tvStand} />
        <div style={s.tvBase} />
      </div>

      {/* --- Settings bar --- */}
      <div style={s.settingsBar}>
        <div style={s.settingGroup}>
          <p style={s.settingLabel}>Theme:</p>
          <div style={s.buttonGroup}>
            {themeOptions.map((opt) => (
              <button
                key={opt.key}
                style={selectedTheme === opt.key ? s.themeBtnActive : s.themeBtn}
                onClick={() => setSelectedTheme(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div style={s.qrSection}>
          <div style={s.qrBox}>QR</div>
          <p style={s.qrText}>Scan to order from your phone</p>
        </div>
      </div>
    </div>
  );
};
