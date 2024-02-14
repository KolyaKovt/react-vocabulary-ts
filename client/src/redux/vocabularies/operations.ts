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

const getTextForError = (error: unknown, process: string) => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError
    return axiosError.message
  }

  return `An error occured while ${process}`
}

export const fetchVocabulariesThunk = createAsyncThunk<Vocabulary[]>(
  "fetch vocabularies",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/")
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getTextForError(error, "fetching vocabularies")
      )
    }
  }
)

export const fetchVocabularyThunk = createAsyncThunk<
  Vocabulary,
  string | number
>("fetch a vocabulary", async (id, thunkAPI) => {
  try {
    const res = await api.get(`/${id}`)
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(
      getTextForError(error, "fetching a vocabulary")
    )
  }
})

export const createVocabularyThunk = createAsyncThunk<void, string>(
  "create a vocabulary",
  async (name, thunkAPI) => {
    try {
      await api.post("/", { name })
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getTextForError(error, "creating a vocabulary")
      )
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
      return thunkAPI.rejectWithValue(
        getTextForError(error, "deleting a vocabulary")
      )
    }
  }
)

interface vocabularyBody {
  id: string | number
  name: string
}

export const renameVocabularyThunk = createAsyncThunk<void, vocabularyBody>(
  "rename a vocabulary",
  async (body, thunkAPI) => {
    try {
      await api.patch("/", body)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getTextForError(error, "renaming a vocabulary")
      )
    }
  }
)

interface wordBody {
  id: string | number
  word: string
  translation: string
}

export const addWordThunk = createAsyncThunk<void, wordBody>(
  "add a word",
  async (body, thunkAPI) => {
    try {
      await api.post("/words", body)
    } catch (error) {
      return thunkAPI.rejectWithValue(getTextForError(error, "adding a word"))
    }
  }
)

export const deleteWordThunk = createAsyncThunk<number, number>(
  "delete a word",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/words/${id}`)
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(getTextForError(error, "deleting a word"))
    }
  }
)

export const changeWordThunk = createAsyncThunk<void, wordBody>(
  "change a word",
  async (body, thunkAPI) => {
    try {
      await api.patch("/words", body)
    } catch (error) {
      return thunkAPI.rejectWithValue(getTextForError(error, "changing a word"))
    }
  }
)
