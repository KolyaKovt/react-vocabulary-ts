import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { WordForm } from "../components/WordForm"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { Loader } from "../components/Loader"
import {
  changeWordThunk,
  fetchVocabularyThunk,
} from "../redux/vocabularies/operations"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

const ChangeWords = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const vocabulary = useAppSelector(selectVocabulary)
  const { id, wordId } = useParams()
  const { handleSubmit, register, reset } = useForm()

  useEffect(() => {
    if (id) dispatch(fetchVocabularyThunk(id))
  }, [dispatch, id])

  const submit: SubmitHandler<FieldValues> = async data => {
    if (id && wordId) {
      await dispatch(
        changeWordThunk({
          id: wordId,
          word: data.word,
          translation: data.translation,
        })
      )
    }

    reset()
    navigate(`/${id}`)
  }

  if (!vocabulary) return <Loader />

  return (
    <main>
      <h1>Changing words in: {vocabulary.name}</h1>
      <WordForm
        submit={handleSubmit(submit)}
        register={register}
        btnLabel="Change"
      />
    </main>
  )
}

export default ChangeWords
