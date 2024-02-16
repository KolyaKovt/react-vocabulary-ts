import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { VocabularyForm } from "../components/VocabularyForm"
import { renameVocabularyThunk } from "../redux/vocabularies/operations"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"

export default function RenameVocabulary() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()
  const { id } = useParams()

  const submit: SubmitHandler<FieldValues> = async data => {
    if (id) {
      await dispatch(
        renameVocabularyThunk({
          name: data.name.trim(),
          id,
        })
      )
    }

    navigate("/")
    reset()
  }

  return (
    <main>
      <section className="flex flex-col items-center">
        <h1 className="mt-6 mb-6 text-4xl font-bold">Rename the vocabulary</h1>
        <VocabularyForm
          submit={handleSubmit(submit)}
          register={register}
          btnLabel={"Rename"}
        />
      </section>
    </main>
  )
}
