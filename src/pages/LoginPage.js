import React, { useState, useEffect } from 'react';
import { useLoginMutation } from '../app/api';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../auth/authSlice';

export default function LoginPage() {
    const [login] = useLoginMutation();
    const dispatch = useDispatch();

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

    const handleSubmit = async () => {
        setError(null);
        try {
            const res = await login(form).unwrap();

            dispatch(setToken(res.accessToken));
            dispatch(setUser(res));

            window.location.href = '/products';
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
            <div className="login-form">
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
                <button onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
}