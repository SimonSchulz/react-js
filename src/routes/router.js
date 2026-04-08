import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import {lazy} from "react";
import LoginPage from "../pages/LoginPage";
import RouteError from "./RouteError";
import Layout from "../components/Layout";
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const ProductDetailsPage = lazy(() => import('../pages/ProductDetailsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
export const router = createBrowserRouter([
    {
        element: <Layout/>,
        errorElement: <RouteError />,
        children: [
            {
                path: '/',
                element: <LoginPage />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '/products',
                        element: <ProductsPage />
                    },
                    {
                        path: '/products/:id',
                        element: <ProductDetailsPage />
                    },
                    {   path: '/profile',
                        element: <ProfilePage />
                    }
                ]
            }
        ]
    }
]);