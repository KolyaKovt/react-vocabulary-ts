import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { fetchVocabularyThunk } from "../redux/vocabularies/operations"
import { selectIsLoading, selectVocabulary } from "../redux/vocabularies/slice"
import { Loader } from "./Loader"

export const VocabularyLayout = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const isLoading = useAppSelector(selectIsLoading)
  const vocabulary = useAppSelector(selectVocabulary)

  useEffect(() => {
    dispatch(fetchVocabularyThunk(id as string))
  }, [dispatch, id])

  if (isLoading || !vocabulary) return <Loader />

  return <Outlet />
}
