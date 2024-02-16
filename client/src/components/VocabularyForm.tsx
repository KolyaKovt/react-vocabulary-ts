import { FormEventHandler } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { Link } from "react-router-dom"

interface Props {
  submit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<FieldValues>
  btnLabel: string
}

export const VocabularyForm = ({ submit, register, btnLabel }: Props) => {
  return (
    <form onSubmit={submit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="name"
          className="input input-bordered"
          required
        />
      </div>
      <div className="btnContainer mt-6">
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
        <button className="btn btn-primary">{btnLabel}</button>
      </div>
    </form>
  )
}
