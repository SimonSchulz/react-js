import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '../app/api';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error } = useGetProductQuery(id);

    if (error) return <div className="error-box">Error loading product</div>;

    if (isLoading)
        return <div className="container skeleton" style={{ height: 200 }} />;

    return (
        <div className="container">
            <button
                className="secondary"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>
            <h1>{data.title}</h1>
            <img src={data.thumbnail} alt={data.title} />
            <p>{data.description}</p>
            <p><b>${data.price}</b></p>
        </div>
    );
}