import { configureStore } from "@reduxjs/toolkit"
import { vocabulariesReducer } from "./vocabularies/slice"

export const store = configureStore({
  reducer: {
    vocabularies: vocabulariesReducer,
  },
  devTools: import.meta.env.MODE !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
