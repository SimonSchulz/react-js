import React, { useState, useDeferredValue } from 'react';
import {
    useGetProductsQuery,
    useGetProductsSearchQuery
} from '../app/api';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SkeletonCard from '../components/SkeletonCard';
import SearchBar from '../components/SearchBar';

export default function ProductsPage() {
    const limitNumber = 24;
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const deferredSearch = useDeferredValue(search);
    const isSearching = deferredSearch.trim().length > 0;

    const {
        data: defaultData,
        isLoading: isLoadingDefault
    } = useGetProductsQuery({
        limit: limitNumber,
        skip: page * limitNumber
    }, {
        skip: isSearching
    });

    const {
        data: searchData,
        isLoading: isLoadingSearch
    } = useGetProductsSearchQuery({
        q: deferredSearch,
        limit: limitNumber,
        skip: page * limitNumber
    }, {
        skip: !isSearching
    });

    const data = isSearching ? searchData : defaultData;
    const isLoading = isSearching ? isLoadingSearch : isLoadingDefault;
    return (
        <div>
            <Header />
            <SearchBar value={search} onChange={setSearch} />
            {search !== deferredSearch && (
                <p style={{ textAlign: 'center' }}>Searching...</p>
            )}
            <div className="grid">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))
                    : data?.products?.map((p) => (
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
                <button onClick={() => setPage((p) => p + 1)} disabled={ limitNumber > (data?.products?.length || 0)}>
                    Next
                </button>
            </div>
        </div>
    );
}