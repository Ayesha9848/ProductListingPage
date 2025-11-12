// components/Pagination.js
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div style={styles.pagination}>
      <button
        style={{ ...styles.btn, opacity: currentPage === 1 ? 0.5 : 1 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          style={{
            ...styles.page,
            ...(page === currentPage ? styles.activePage : {}),
          }}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        style={{ ...styles.btn, opacity: currentPage === totalPages ? 0.5 : 1 }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </button>
    </div>
  )
}

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: 6,
    marginTop: 24,
    flexWrap: 'wrap',
  },
  btn: {
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer',
  },
  page: {
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer',
  },
  activePage: {
    background: '#ff4081',
    color: '#fff',
    border: '1px solid #ff4081',
  },
}
