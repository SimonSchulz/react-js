import React, { useState } from 'react';
import { useGetProductsQuery } from '../app/api';
import { Link } from 'react-router-dom';

export default function ProductsPage() {
    const [page, setPage] = useState(0);
    const { data, isLoading } = useGetProductsQuery({
        limit: 10,
        skip: page * 10
    });

    if (isLoading) return 'Loading...';

    return (
        <div>
            <div className="grid">
                {data.products.map((p) => (
                    <Link key={p.id} to={`/products/${p.id}`} className="card">
                        <img src={p.thumbnail} />
                        <h3>{p.title}</h3>
                        <p>${p.price}</p>
                    </Link>
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
                    Prev
                </button>
                <button onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
        </div>
    );
}