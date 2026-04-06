import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/'
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
        })
    })
});

export const {
    useLoginMutation,
    useGetProductsQuery,
    useGetProductQuery
} = api;