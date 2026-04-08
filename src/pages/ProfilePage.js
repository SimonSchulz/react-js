import React from 'react';
import { useGetMeQuery } from '../app/api';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const { data, isLoading } = useGetMeQuery();
    const navigate = useNavigate();

    if (isLoading) return <p style={{ textAlign: 'center' }}>Loading...</p>;
    if (!data) return <p style={{ textAlign: 'center' }}>No data</p>;

    return (
        <div className="profile">
            <button onClick={() => navigate('/products')}>
                ← Back
            </button>
            <div className="profile-header">
                <img src={data.image} alt="" />
                <div>
                    <h2>{data.firstName} {data.lastName}</h2>
                    <p>@{data.username}</p>
                    <span className="badge">{data.role}</span>
                </div>
            </div>
            <div className="profile-section">
                <h3>Personal Info</h3>
                <p><b>Email:</b> {data.email}</p>
                <p><b>Phone:</b> {data.phone}</p>
                <p><b>Age:</b> {data.age}</p>
                <p><b>Gender:</b> {data.gender}</p>
                <p><b>Blood:</b> {data.bloodGroup}</p>
            </div>
            <div className="profile-section">
                <h3>Company</h3>
                <p><b>{data.company?.name}</b></p>
                <p>{data.company?.title}</p>
                <p>{data.company?.department}</p>
            </div>
            <div className="profile-section">
                <h3>Address</h3>
                <p>{data.address?.address}</p>
                <p>{data.address?.city}, {data.address?.state}</p>
                <p>{data.address?.postalCode}</p>
            </div>
        </div>
    );
}