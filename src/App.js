import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <ProductsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/products/:id"
                    element={
                        <ProtectedRoute>
                            <ProductDetailsPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}