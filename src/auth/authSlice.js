import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        setUser: (state, action) => {
            const user = {
                username: action.payload.username,
                image: action.payload.image
            };

            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});

export const { setToken, setUser, logout } = slice.actions;
export default slice.reducer;