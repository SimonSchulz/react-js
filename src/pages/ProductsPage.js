import React, { useState, useMemo } from 'react'
import { useGetProductsQuery } from '../app/api'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Pagination from "../components/Pagination";
import ProductsList from "../components/ProductsList";
import SkeletonList from "../components/SkeletonList";


export default function ProductsPage() {
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')

    const { data, isLoading, error } = useGetProductsQuery({
        limit: 12,
        skip: page * 12
    })

    const filtered = useMemo(() => {
        return data?.products.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
        ) || []
    }, [data, search])

    return (
        <div>
            <Header />
            <SearchBar value={search} onChange={setSearch} />

            {error && <div className="error-box">Error loading products</div>}

            <div className="grid">
                {isLoading ? (
                    <SkeletonList />
                ) : (
                    <ProductsList products={filtered} />
                )}
            </div>

            <Pagination page={page} setPage={setPage} />
        </div>
    )
}