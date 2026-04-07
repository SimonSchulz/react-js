import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import {lazy} from "react";
import LoginPage from "../pages/LoginPage";
import RouteError from "./RouteError";
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const ProductDetailsPage = lazy(() => import('../pages/ProductDetailsPage'));
export const router = createBrowserRouter([
    {
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
                    }
                ]
            }
        ]
    }
]);