import React, { useState } from 'react';
import { useGetProductsQuery } from '../app/api';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SkeletonCard from '../components/SkeletonCard';
import SearchBar from '../components/SearchBar';

export default function ProductsPage() {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');

    const { data, isLoading, error } = useGetProductsQuery({
        limit: 10,
        skip: page * 10
    });

    const filtered =
        data?.products.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
        ) || [];

    return (
        <div>
            <Header />

            <SearchBar value={search} onChange={setSearch} />

            {error && <div className="error-box">Error loading products</div>}

            <div className="grid">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))
                    : filtered.map((p) => (
                        <Link key={p.id} to={`/products/${p.id}`} className="card">
                            <img src={p.thumbnail} />
                            <h3>{p.title}</h3>
                            <p>${p.price}</p>
                        </Link>
                    ))}
            </div>

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
        </div>
    );
}