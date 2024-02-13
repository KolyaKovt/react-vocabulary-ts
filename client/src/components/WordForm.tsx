import { FormEventHandler, useEffect } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { fetchVocabulary } from "../redux/vocabularies/operations"

interface Props {
  submit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<FieldValues>
  btnLabel: string
}

export const WordForm = ({ submit, register, btnLabel }: Props) => {
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(fetchVocabulary(id))
    }
  }, [dispatch, id])

  return (
    <form onSubmit={submit} className="card-body mb-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Word</span>
        </label>
        <input
          {...register("word")}
          type="text"
          placeholder="I like you"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Translation</span>
        </label>
        <input
          {...register("transl")}
          type="text"
          placeholder="Ik vind je leuk"
          className="input input-bordered"
          required
        />
      </div>
      <div className="flex flex-row mt-6 gap-2">
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
        <button className="btn btn-primary">{btnLabel}</button>
      </div>
    </form>
  )
}
