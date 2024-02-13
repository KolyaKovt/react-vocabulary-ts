import { useEffect } from "react"
import { WordForm } from "../components/WordForm"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { useParams } from "react-router-dom"
import { addWordThunk, fetchVocabularyThunk } from "../redux/vocabularies/operations"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Loader } from "../components/Loader"

export default function AddWords() {
  const vocabulary = useAppSelector(selectVocabulary)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (id) dispatch(fetchVocabularyThunk(id))
  }, [dispatch, id])

  const submit: SubmitHandler<FieldValues> = data => {
    const { word, translation } = data
    if (id) dispatch(addWordThunk({ id, word, translation }))
    reset()
  }

  if (!vocabulary) return <Loader />

  return (
    <main className="flex flex-col items-center">
      <h1 className="mt-6 mb-6 text-4xl font-bold">
        Adding words in: {vocabulary.name}
      </h1>
      <WordForm
        submit={handleSubmit(submit)}
        register={register}
        btnLabel="Add"
      />
    </main>
  )
}
