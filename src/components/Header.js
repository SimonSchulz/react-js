import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const token = useSelector((s) => s.auth.token);
    const user = useSelector((s) => s.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <header className="header">
            {token && <button onClick={handleLogout}>Logout</button>}
            <h1 onClick={() => navigate('/products')}>Products App</h1>
            {token && (
                <div className="header-right">
                    <div
                        className="user"
                        onClick={() => navigate('/profile')}
                    >
                        <img src={user?.image} alt="" />
                        <span>{user?.username}</span>
                    </div>
                </div>
            )}
        </header>
    );
}