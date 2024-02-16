import { configureStore } from "@reduxjs/toolkit"
import { vocabulariesReducer } from "./vocabularies/slice"

export const store = configureStore({
  reducer: {
    vocabularies: vocabulariesReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
})

console.log(import.meta.env.NODE_ENV)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
