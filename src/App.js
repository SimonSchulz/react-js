import React, {Suspense} from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export default function App() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <RouterProvider router={router} />
        </Suspense>
    );
}