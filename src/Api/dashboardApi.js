import { api } from "./api"

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "adminapi/dashboard-Stats/",
        method: "GET",
      }),
      providesTags: ["stats"],
    }),
    getMonthlyRevenueStats: builder.query({
      query: () => ({
        url: "adminapi/revenue-Monthly-stats/",
        method: "GET",
      }),
      providesTags: ["revenue"],
    }),
    getUserMonthlyStats: builder.query({
      query: () => ({
        url: "adminapi/user-Monthly-stats/",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
})

export const { useGetDashboardStatsQuery, useGetMonthlyRevenueStatsQuery, useGetUserMonthlyStatsQuery } = authApi
