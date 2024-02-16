import { WordForm } from "../components/WordForm"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { addWordThunk } from "../redux/vocabularies/operations"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Vocabulary } from "../types/Vocabulary"

export default function AddWords() {
  const vocabulary = useAppSelector(selectVocabulary) as Vocabulary
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm()

  const submit: SubmitHandler<FieldValues> = data => {
    const { word, translation } = data
    dispatch(addWordThunk({ id: vocabulary.id, word, translation }))
    reset()
  }

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
