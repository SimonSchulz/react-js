import React, { useState } from 'react';
import { useLoginMutation } from '../app/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../auth/authSlice';
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

    const handleSubmit = async () => {
        setError(null);

        if (!form.username || !form.password) {
            setError('Please fill all fields');
            return;
        }

        try {
            const res = await login(form).unwrap();
            dispatch(setToken(res.token));
            navigate('/products');
        } catch (e) {
            if (e?.data?.message) {
                setError(e.data.message);
            } else {
                setError('Login failed');
            }
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>

            <input
                value={form.username}
                onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                }
                placeholder="Username"
            />

            <input
                type="password"
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
                placeholder="Password"
            />

            {error && <p className="error">{error}</p>}

            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}