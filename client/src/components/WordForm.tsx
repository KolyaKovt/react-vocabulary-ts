import { FormEventHandler } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { Link, useParams } from "react-router-dom"

interface Props {
  submit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<FieldValues>
  btnLabel: string
}

export const WordForm = ({ submit, register, btnLabel }: Props) => {
  const { id } = useParams()

  return (
    <form onSubmit={submit}>
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
          {...register("translation")}
          type="text"
          placeholder="Ik vind je leuk"
          className="input input-bordered"
          required
        />
      </div>
      <div className="btnContainer mt-6">
        <Link className="btn btn-secondary" to={`/${id}`}>
          Cancel
        </Link>
        <button className="btn btn-primary">{btnLabel}</button>
      </div>
    </form>
  )
}
