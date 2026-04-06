import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../app/api';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { data } = useGetProductQuery(id);

    if (!data) return 'Loading...';

    return (
        <div className="container">
            <h1>{data.title}</h1>
            <img src={data.thumbnail} />
            <p>{data.description}</p>
            <p><b>${data.price}</b></p>
        </div>
    );
}