import { useNavigate, useParams } from "react-router-dom"
import { WordForm } from "../components/WordForm"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { changeWordThunk } from "../redux/vocabularies/operations"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Vocabulary } from "../types/Vocabulary"
import { Container } from "../components/Container"

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
    <Container>
      <main>
        <h1 className="mainTitle mt-6 mb-6">Changing words in: {vocabulary.name}</h1>
        <WordForm
          submit={handleSubmit(submit)}
          register={register}
          btnLabel="Change"
        />
      </main>
    </Container>
  )
}

export default ChangeWords
