import React from 'react';
import { useGetMeQuery } from '../app/api';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const { data, isLoading } = useGetMeQuery();
    const navigate = useNavigate();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="profile">
            <h2>{data.username}</h2>

            <p>{data.email}</p>

            <button onClick={() => navigate('/products')}>
                Go to products
            </button>
        </div>
    );
}