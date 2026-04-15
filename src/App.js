import React, {Suspense, useEffect} from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import {useGetMeQuery} from "./app/api";
import {logout, setUser} from "./auth/authSlice";
import {useDispatch, useSelector} from "react-redux";

export default function App() {
    const dispatch = useDispatch();
    const token = useSelector((s) => s.auth.token);
    const { data, error } = useGetMeQuery(undefined, {
        skip: !token
    });
    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        }
        if (error) {
            dispatch(logout());
        }
    }, [data, error, dispatch]);
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <RouterProvider router={router} />
        </Suspense>
    );
}