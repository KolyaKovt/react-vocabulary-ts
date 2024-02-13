import { useEffect } from "react"
import { WordForm } from "../components/WordForm"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { useParams } from "react-router-dom"
import { addWordThunk, fetchVocabulary } from "../redux/vocabularies/operations"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

export default function AddWords() {
  const vocabulary = useAppSelector(selectVocabulary)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (id) dispatch(fetchVocabulary(id))
  }, [dispatch, id])

  const submit: SubmitHandler<FieldValues> = data => {
    const { word, translation } = data
    if (id) dispatch(addWordThunk({ id, word, translation }))
    reset()
  }

  if (!vocabulary) return <h1>The vocabulary wasn't found</h1>

  return (
    <main className="flex flex-col items-center">
      <h1>Adding words in: {vocabulary.name}</h1>
      <WordForm
        submit={handleSubmit(submit)}
        register={register}
        btnLabel="Add"
      />
    </main>
  )
}
