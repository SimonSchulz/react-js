import React, { useState } from 'react';
import {
    useGetProductsQuery,
    useGetProductsSearchQuery
} from '../app/api';
import SearchBar from '../components/SearchBar';
import ProductsList from "../components/ProductsList";
import SkeletonList from "../components/SkeletonList";
import useDebounce from "../hooks/useDebounce";

export default function ProductsPage() {
    const limitNumber = 15;
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const isSearching = debouncedSearch.trim().length > 0;

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
        q: debouncedSearch,
        limit: limitNumber,
        skip: page * limitNumber
    }, {
        skip: !isSearching
    });
    const data = isSearching ? searchData : defaultData;
    const isLoading = isSearching ? isLoadingSearch : isLoadingDefault;
    return (
        <div>
            <SearchBar value={search} onChange={setSearch} />
            {search !== debouncedSearch && (
                <p style={{ textAlign: 'center' }}>Searching...</p>
            )}
            <div className="grid">
                {isLoading
                    ? <SkeletonList/>
                    : <ProductsList products={data?.products} />
                    }
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