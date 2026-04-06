import React, { useState } from 'react';
import { useLoginMutation } from '../app/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/auth/authSlice';

export default function LoginPage() {
    const [login] = useLoginMutation();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        username: 'kminchelle',
        password: '0lelplR'
    });

    const handleSubmit = async () => {
        const res = await login(form).unwrap();
        dispatch(setToken(res.token));
        window.location.href = '/products';
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input
                value={form.username}
                onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                }
            />
            <input
                type="password"
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}