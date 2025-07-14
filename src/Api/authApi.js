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
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     try {
      //       const { data } = await queryFulfilled;
      //       const { refresh, access } = data;
      //       console.log("access token", access);
      //       // Dispatch userLoggedIn to update Redux state
      //       dispatch(
      //         setCredentials({
      //           access: access,
      //           refresh: refresh,
      //         })
      //       );

      //       // Persist user data to localStorage
      //       localStorage.setItem("auth", JSON.stringify({ refresh, access }));

      //       console.log("Login successful:", data);
      //     } catch (error) {
      //       return;
      //     }
      //   },
    }),
  }),
});

export const { useLoginMutation } = authApi;
