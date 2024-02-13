import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError, isAxiosError } from "axios"
import { Vocabulary } from "../../types/Vocabulary"

// http://localhost:3310
// https://vocabulary-dsm6.onrender.com
const api = axios.create({
  baseURL:
    import.meta.env.NODE_ENV === "production"
      ? "https://vocabulary-dsm6.onrender.com"
      : "http://localhost:3310",
})

export const fetchVocabulariesThunk = createAsyncThunk<Vocabulary[]>(
  "fetch vocabularies",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/")
      return res.data
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError
        return thunkAPI.rejectWithValue(axiosError.message)
      } else {
        return thunkAPI.rejectWithValue(
          "An error occured while fetching vocabularies"
        )
      }
    }
  }
)

export const fetchVocabulary = createAsyncThunk<Vocabulary, string | number>(
  "fetch a vocabulary",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/${id}`)
      return res.data
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError
        return thunkAPI.rejectWithValue(axiosError.message)
      } else {
        return thunkAPI.rejectWithValue(
          "An error occured while fetching a vocabulary"
        )
      }
    }
  }
)

export const createVocabularyThunk = createAsyncThunk<void, string>(
  "create a vocabulary",
  async (name, thunkAPI) => {
    try {
      await api.post("/", { name })
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError
        return thunkAPI.rejectWithValue(axiosError.message)
      } else {
        return thunkAPI.rejectWithValue(
          "An error occured while creating a vocabulary"
        )
      }
    }
  }
)

export const deleteVocabularyThunk = createAsyncThunk<number, string | number>(
  "delete a vocabulary",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/${id}`)
      return +id
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError
        return thunkAPI.rejectWithValue(axiosError.message)
      } else {
        return thunkAPI.rejectWithValue(
          "An error occured while deleting a vocabulary"
        )
      }
    }
  }
)

export const renameVocabularyThunk = createAsyncThunk<
  void,
  { id: string | number; name: string }
>("rename a vocabulary", async (data, thunkAPI) => {
  try {
    await api.patch("/", data)
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError
      return thunkAPI.rejectWithValue(axiosError.message)
    } else {
      return thunkAPI.rejectWithValue(
        "An error occured while renaming a vocabulary"
      )
    }
  }
})

export const addWordThunk = createAsyncThunk<
  void,
  { id: string | number; word: string; translation: string }
>("add words", async (data, thunkAPI) => {
  try {
    await api.post("/words", data)
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError
      return thunkAPI.rejectWithValue(axiosError.message)
    } else {
      return thunkAPI.rejectWithValue("An error occured while adding a word")
    }
  }
})
