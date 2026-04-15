import React, { useState, useEffect } from 'react';
import { useLoginMutation } from '../app/api';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../auth/authSlice';
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: 'emilys',
        password: 'emilyspass'
    });

    const [error, setError] = useState(null);
    const messages = [
        "Find the best products",
        "Fast and modern UI",
        "Powered by React + RTK Query"
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % messages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await login(form).unwrap();

            dispatch(setToken(res.accessToken));
            dispatch(setUser(res));
            navigate('/products');
        } catch (e) {
            setError('Login failed');
        }
    };
    return (
        <div className="login-layout">
            <div className="login-info">
                <h1>Welcome to Products App</h1>

                <p className="carousel">{messages[index]}</p>

                <div className="features">
                    <div className="feature">
                        <h3>⚡ Fast</h3>
                        <p>Optimized performance</p>
                    </div>

                    <div className="feature">
                        <h3>🔍 Smart Search</h3>
                        <p>Instant results</p>
                    </div>

                    <div className="feature">
                        <h3>📦 Products</h3>
                        <p>Thousands of items</p>
                    </div>
                </div>
            </div>
            <form className="login-form"  onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    value={form.username}
                    name="username"
                    onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                    }
                    placeholder="Username"
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Password"
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}