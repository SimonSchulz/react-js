import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
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
]);