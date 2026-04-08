import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body
            })
        }),
        getProducts: builder.query({
            query: ({ limit = 12, skip = 0 }) =>
                `products?limit=${limit}&skip=${skip}`
        }),
        getProduct: builder.query({
            query: (id) => `products/${id}`
        }),
        getProductsSearch: builder.query({
            query: ({ q, limit = 10, skip = 0 }) =>
                `products/search?q=${q}&limit=${limit}&skip=${skip}`
        }),
        getMe: builder.query({
            query: () => 'auth/me'
        })
    })
});

export const {
    useLoginMutation,
    useGetProductsQuery,
    useGetProductQuery,
    useGetProductsSearchQuery,
    useGetMeQuery,
} = api;