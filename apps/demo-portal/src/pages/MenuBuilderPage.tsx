import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Header } from '../components/layout/Header';
import { mockMenuCategories, mockMenuItems } from '../data/mockDemoData';
import { Plus, Camera, X } from 'lucide-react';

const dietaryColors: Record<string, { bg: string; text: string }> = {
  vegetarian: { bg: '#dcfce7', text: '#16a34a' },
  vegan: { bg: '#d1fae5', text: '#059669' },
  'gluten-free': { bg: '#fef3c7', text: '#d97706' },
  halal: { bg: '#dbeafe', text: '#2563eb' },
  kosher: { bg: '#ede9fe', text: '#7c3aed' },
};

const styles: Record<string, CSSProperties> = {
  page: {
    padding: 0,
  },
  splitLayout: {
    display: 'flex',
    gap: '24px',
  },
  leftPanel: {
    width: '250px',
    flexShrink: 0,
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  panelTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '16px 16px 8px 16px',
    margin: 0,
  },
  categoryList: {
    listStyle: 'none',
    padding: '0 0 8px 0',
    margin: 0,
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#374151',
    borderLeft: '3px solid transparent',
    transition: 'background-color 0.15s, border-color 0.15s',
  },
  categoryItemActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#0d9488',
    fontWeight: 600,
    borderLeft: '3px solid #0d9488',
    backgroundColor: '#ccfbf1',
    transition: 'background-color 0.15s, border-color 0.15s',
  },
  categoryEmoji: {
    fontSize: '18px',
    width: '24px',
    textAlign: 'center',
    flexShrink: 0,
  },
  categoryName: {
    flex: 1,
    margin: 0,
  },
  categoryCount: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '22px',
    height: '22px',
    borderRadius: '9999px',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    fontSize: '12px',
    fontWeight: 500,
    padding: '0 6px',
    flexShrink: 0,
  },
  categoryCountActive: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '22px',
    height: '22px',
    borderRadius: '9999px',
    backgroundColor: '#0d9488',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 500,
    padding: '0 6px',
    flexShrink: 0,
  },
  addCategoryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    margin: '8px 16px 0 16px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#0d9488',
    backgroundColor: '#f0fdfa',
    border: '1px dashed #0d9488',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  rightPanel: {
    flex: 1,
    minWidth: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  itemCount: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  addButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#0d9488',
    backgroundColor: '#ffffff',
    border: '2px solid #0d9488',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  itemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    transition: 'box-shadow 0.15s, border-color 0.15s',
    cursor: 'pointer',
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  itemEmoji: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: '#ccfbf1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
  },
  itemTitleRow: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  itemName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  itemPrice: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#0d9488',
    margin: 0,
  },
  itemDescription: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.5',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  imageSection: {
    position: 'relative',
    marginBottom: '12px',
  },
  itemImage: {
    width: '100%',
    height: '160px',
    borderRadius: '10px',
    objectFit: 'cover',
    backgroundColor: '#f3f4f6',
  },
  imageUploadArea: {
    width: '100%',
    height: '160px',
    borderRadius: '10px',
    border: '2px dashed #d1d5db',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  imageUploadAreaHover: {
    borderColor: '#0d9488',
    backgroundColor: '#f0fdfa',
  },
  uploadIcon: {
    color: '#9ca3af',
  },
  uploadText: {
    fontSize: '12px',
    color: '#6b7280',
    textAlign: 'center',
  },
  removeImageBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.15s',
  },
  hiddenInput: {
    display: 'none',
  },
};

export const MenuBuilderPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('appetizers');
  const [categories, setCategories] = useState(mockMenuCategories);
  const [itemImages, setItemImages] = useState<Record<string, string>>({});

  const filteredItems = mockMenuItems.filter(
    (item) => item.category === selectedCategory,
  );

  const handleAddCategory = () => {
    const newCategoryId = `category-${Date.now()}`;
    const newCategory = {
      id: newCategoryId,
      name: 'New Category',
      emoji: '✨',
      itemCount: 0,
    };
    setCategories([...categories, newCategory]);
    setSelectedCategory(newCategoryId);
  };

  const handleImageUpload = (itemId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setItemImages((prev) => ({
        ...prev,
        [itemId]: dataUrl,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (itemId: string) => {
    setItemImages((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  return (
    <div style={styles.page}>
      <Header
        title="Menu Builder"
        subtitle="Digital menu management with real-time updates"
      />

      <div style={styles.splitLayout}>
        <div style={styles.leftPanel}>
          <p style={styles.panelTitle}>Categories</p>
          <ul style={styles.categoryList}>
            {categories.map((category) => {
              const isActive = category.id === selectedCategory;
              return (
                <li
                  key={category.id}
                  style={isActive ? styles.categoryItemActive : styles.categoryItem}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span style={styles.categoryEmoji}>{category.emoji}</span>
                  <span style={styles.categoryName}>{category.name}</span>
                  <span style={isActive ? styles.categoryCountActive : styles.categoryCount}>
                    {category.itemCount}
                  </span>
                </li>
              );
            })}
          </ul>
          <button
            style={styles.addCategoryBtn}
            onClick={handleAddCategory}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#ccfbf1';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#f0fdfa';
            }}
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.toolbar}>
            <p style={styles.itemCount}>
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
            </p>
            <button style={styles.addButton}>+ Add Item</button>
          </div>

          <div style={styles.itemGrid}>
            {filteredItems.map((item) => {
              const itemImage = itemImages[item.id];
              return (
                <div
                  key={item.id}
                  style={styles.itemCard}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 4px 16px rgba(0, 0, 0, 0.08)';
                    (e.currentTarget as HTMLElement).style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb';
                  }}
                >
                  {/* Image Upload Area */}
                  <div style={styles.imageSection}>
                    {itemImage ? (
                      <>
                        <img
                          src={itemImage}
                          alt={item.name}
                          style={styles.itemImage}
                        />
                        <button
                          style={styles.removeImageBtn}
                          onClick={() => handleRemoveImage(item.id)}
                          title="Remove image"
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = '#fee2e2';
                            (e.currentTarget as HTMLElement).style.color = '#dc2626';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff';
                            (e.currentTarget as HTMLElement).style.color = '#374151';
                          }}
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <label
                        style={styles.imageUploadArea}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = '#0d9488';
                          (e.currentTarget as HTMLElement).style.backgroundColor = '#f0fdfa';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = '#d1d5db';
                          (e.currentTarget as HTMLElement).style.backgroundColor = '#f9fafb';
                        }}
                      >
                        <Camera size={20} style={styles.uploadIcon} />
                        <span style={styles.uploadText}>Click to upload image</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={styles.hiddenInput}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(item.id, file);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>

                  <div style={styles.itemHeader}>
                    <div style={styles.itemEmoji}>{item.emoji}</div>
                    <div style={styles.itemTitleRow}>
                      <p style={styles.itemName}>{item.name}</p>
                      <p style={styles.itemPrice}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p style={styles.itemDescription}>{item.description}</p>
                  {item.dietary.length > 0 && (
                    <div style={styles.tagRow}>
                      {item.dietary.map((tag) => {
                        const tagColor = dietaryColors[tag] ?? {
                          bg: '#f3f4f6',
                          text: '#6b7280',
                        };
                        return (
                          <span
                            key={tag}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              fontSize: '11px',
                              fontWeight: 500,
                              backgroundColor: tagColor.bg,
                              color: tagColor.text,
                            }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
