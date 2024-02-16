import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { VocabularyForm } from "../components/VocabularyForm"
import { createVocabularyThunk } from "../redux/vocabularies/operations"
import { useAppDispatch } from "../redux/hooks"
import { Container } from "../components/Container"

export default function NewVocabulary() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm()

  const submit: SubmitHandler<FieldValues> = data => {
    dispatch(createVocabularyThunk(data.name.trim()))
    reset()
  }

  return (
    <Container>
      <main>
        <section>
          <p className="mt-6 mb-6 text-4xl font-bold">New vocabulary</p>
          <VocabularyForm
            submit={handleSubmit(submit)}
            register={register}
            btnLabel={"Add"}
          />
        </section>
      </main>
    </Container>
  )
}
