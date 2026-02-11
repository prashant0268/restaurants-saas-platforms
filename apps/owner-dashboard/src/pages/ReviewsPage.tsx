export const ReviewsPage = () => {
  return (
    <div>
      <h1 style={styles.title}>Reviews</h1>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><p style={styles.statValue}>4.6</p><p style={styles.statLabel}>Average Rating</p></div>
        <div style={styles.statCard}><p style={styles.statValue}>342</p><p style={styles.statLabel}>Total Reviews</p></div>
        <div style={styles.statCard}><p style={styles.statValue}>12</p><p style={styles.statLabel}>Needs Response</p></div>
      </div>

      <div style={styles.section}>
        <div style={styles.filters}>
          <button style={styles.filterBtnActive}>All</button>
          <button style={styles.filterBtn}>Needs Response</button>
          <button style={styles.filterBtn}>5 Stars</button>
          <button style={styles.filterBtn}>4 Stars</button>
          <button style={styles.filterBtn}>3 Stars</button>
          <button style={styles.filterBtn}>1-2 Stars</button>
        </div>

        {[
          { name: 'Sarah J.', rating: 5, date: '2 days ago', comment: 'Amazing food and fast delivery!', responded: true },
          { name: 'Mike C.', rating: 4, date: '3 days ago', comment: 'Great pizza, portion could be bigger.', responded: false },
          { name: 'Emily D.', rating: 2, date: '5 days ago', comment: 'Order was late and cold.', responded: false },
        ].map((r, i) => (
          <div key={i} style={styles.reviewCard}>
            <div style={styles.reviewHeader}>
              <div><span style={styles.reviewName}>{r.name}</span><span style={styles.reviewDate}>{r.date}</span></div>
              <span style={styles.stars}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            </div>
            <p style={styles.reviewComment}>{r.comment}</p>
            <div style={styles.reviewActions}>
              {r.responded ? <span style={styles.respondedBadge}>Responded</span> : <button style={styles.replyBtn}>Reply</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#171717' },
  statsRow: { display: 'flex', gap: 16, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 16, border: '1px solid #E5E5E5', textAlign: 'center' as const },
  statValue: { margin: 0, fontSize: 28, fontWeight: 700 },
  statLabel: { margin: '4px 0 0', fontSize: 13, color: '#737373' },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5' },
  filters: { display: 'flex', gap: 8, marginBottom: 20 },
  filterBtn: { padding: '6px 14px', border: '1px solid #E5E5E5', borderRadius: 6, backgroundColor: '#fff', cursor: 'pointer', fontSize: 13 },
  filterBtnActive: { padding: '6px 14px', border: 'none', borderRadius: 6, backgroundColor: '#FF6B35', color: '#fff', cursor: 'pointer', fontSize: 13 },
  reviewCard: { padding: 16, borderBottom: '1px solid #F5F5F5' },
  reviewHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  reviewName: { fontWeight: 600, fontSize: 14, marginRight: 12 },
  reviewDate: { color: '#737373', fontSize: 12 },
  stars: { color: '#F59E0B', fontSize: 16 },
  reviewComment: { margin: '8px 0', fontSize: 14, color: '#525252' },
  reviewActions: { display: 'flex', gap: 8 },
  replyBtn: { padding: '4px 12px', backgroundColor: '#FF6B35', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 },
  respondedBadge: { padding: '2px 8px', borderRadius: 4, backgroundColor: '#DCFCE7', color: '#16A34A', fontSize: 12 },
};
