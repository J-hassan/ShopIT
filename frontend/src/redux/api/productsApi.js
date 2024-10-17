import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const productApi = createApi({
    reducerPath : "productApi",
    baseQuery : fetchBaseQuery({baseUrl : "http://localhost:4000/api/v1"}),
    endpoints : (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: "/products",
                params: {
                    page : params?.page,
                    keyword : params?.keyword,
                    category : params?.category,
                    "price[gte]": params?.min,
                    "price[lte]":params?.max,
                    "rating[gte]":params?.rating,
                }
            }),
        }),
        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,
        })
    })
})

export const { useGetProductsQuery , useGetProductDetailsQuery } = productApi;




