import { setCredentials } from "../features/authSlice";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login/",
        method: "POST",
        body: data,
      }),
    }),
    allRecipe: builder.query({
      query: () => `/adminapi/recipes/`,
      providesTags: ["users"],
    }),
    createRecipe: builder.mutation({
      query: (data) => ({
        url: "/adminapi/recipes/",
        method: "POST",
        body: data,
        // Let fetchBaseQuery set Content-Type automatically for FormData
        headers:
          data instanceof FormData ? { "Content-Type": undefined } : undefined,
      }),
      invalidatesTags: ["users"],
    }),
    getRecipe: builder.query({
      query: (id) => `/adminapi/recipes/${id}/`,
      providesTags: ["users"],
    }),
    updateRecipe: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminapi/recipes/${id}/`,
        method: "PATCH",
        body: data,
        headers:
          data instanceof FormData ? { "Content-Type": undefined } : undefined,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useAllRecipeQuery,
  useCreateRecipeMutation,
  useGetRecipeQuery,
  useUpdateRecipeMutation,
} = authApi;
