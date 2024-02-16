import { useNavigate, useParams } from "react-router-dom"
import { WordForm } from "../components/WordForm"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { changeWordThunk } from "../redux/vocabularies/operations"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Vocabulary } from "../types/Vocabulary"

const ChangeWords = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const vocabulary = useAppSelector(selectVocabulary) as Vocabulary
  const { wordId } = useParams()
  const { handleSubmit, register, reset } = useForm()

  const submit: SubmitHandler<FieldValues> = async data => {
    if (vocabulary.id && wordId) {
      await dispatch(
        changeWordThunk({
          id: wordId,
          word: data.word,
          translation: data.translation,
        })
      )
    }

    reset()
    navigate(`/${vocabulary.id}`)
  }

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
