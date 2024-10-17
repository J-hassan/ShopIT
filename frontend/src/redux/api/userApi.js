import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser , setIsAuthenticated, setLoading } from "../features/userSlice";



export const userApi = createApi({
    reducerPath : "userApi",
    tagTypes : ["User"],
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:4000/api/v1",
        credentials : "include"
    }),
    endpoints : (builder) => ({
        getMe: builder.query({
            query: () => `/me`,
            transformResponse : (result) => result.user,
            async onQueryStarted(args , {dispatch , queryFulfilled}){
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data))
                    dispatch(setIsAuthenticated(true))
                    dispatch(setLoading(false))
                } catch (error) {
                    dispatch(setLoading(false))
                    console.log(error)
                }
            },
            providesTags : ["User" ]       
        }),

        updateProfile : builder.mutation({
            query(body){
                return {
                    url : "/me/update",
                    method : "PUT",
                    body,
                }
            },
            invalidatesTags : ["User"]
        }),

        uploadAvatar : builder.mutation({
            query(body){
                return {
                    url : "/me/upload_avatar",
                    method : "PUT",
                    body,
                }
            },
            invalidatesTags : ["User"]
        })

    })
})

export const { useGetMeQuery , useUpdateProfileMutation , useUploadAvatarMutation } = userApi;




