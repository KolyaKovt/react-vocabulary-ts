import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import {
  addWordThunk,
  deleteVocabularyThunk,
  deleteWordThunk,
  fetchVocabulariesThunk,
  fetchVocabularyThunk,
  renameVocabularyThunk,
} from "./operations"
import { Vocabulary } from "../../types/Vocabulary"

interface State {
  vocabularies: Vocabulary[]
  vocabulary: Vocabulary | null
  isLoading: boolean
  error: string | null
}

const initialState: State = {
  vocabularies: [],
  vocabulary: null,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: "vocabularies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVocabulariesThunk.fulfilled, (state, { payload }) => {
        state.vocabularies = payload
      })
      .addCase(deleteVocabularyThunk.fulfilled, (state, { payload }) => {
        state.vocabularies = state.vocabularies.filter(
          voc => voc.id !== payload
        )
      })
      .addCase(fetchVocabularyThunk.fulfilled, (state, { payload }) => {
        state.vocabulary = payload
      })
      .addCase(deleteWordThunk.fulfilled, (state, { payload }) => {
        const voc = state.vocabulary
        if (voc) {
          const wordIndex = voc.wordsIds.indexOf(payload)
          voc.firstLang.splice(wordIndex, 1)
          voc.secLang.splice(wordIndex, 1)
          voc.wordsIds.splice(wordIndex, 1)
        }
      })
      .addMatcher(
        isAnyOf(
          deleteVocabularyThunk.pending,
          renameVocabularyThunk.pending,
          fetchVocabulariesThunk.pending,
          fetchVocabularyThunk.pending,
          addWordThunk.pending,
          deleteWordThunk.pending
        ),
        state => {
          state.isLoading = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          deleteVocabularyThunk.fulfilled,
          renameVocabularyThunk.fulfilled,
          fetchVocabulariesThunk.fulfilled,
          fetchVocabularyThunk.fulfilled,
          deleteWordThunk.fulfilled,
          addWordThunk.fulfilled
        ),
        state => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(
          deleteVocabularyThunk.rejected,
          renameVocabularyThunk.rejected,
          fetchVocabulariesThunk.rejected,
          fetchVocabularyThunk.rejected,
          deleteWordThunk.rejected,
          addWordThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false
          state.error = payload as string
        }
      )
  },
  selectors: {
    selectVocabularies: state => state.vocabularies,
    selectVocabulary: state => state.vocabulary,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
  },
})

export const vocabulariesReducer = slice.reducer

export const {
  selectVocabularies,
  selectVocabulary,
  selectIsLoading,
  selectError,
} = slice.selectors
