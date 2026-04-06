export default function Pagination({ page, setPage }) {
    return (
        <div className="pagination">
            <button
                className="secondary"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
            >
                Prev
            </button>

            <button onClick={() => setPage((p) => p + 1)}>
                Next
            </button>
        </div>
    )
}