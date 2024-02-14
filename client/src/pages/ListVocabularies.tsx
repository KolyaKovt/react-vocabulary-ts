import { useEffect } from "react"
import { Link } from "react-router-dom"

import { Loader } from "../components/Loader"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  deleteVocabularyThunk,
  fetchVocabulariesThunk,
} from "../redux/vocabularies/operations"
import {
  selectIsLoading,
  selectVocabularies,
} from "../redux/vocabularies/slice"

export default function ListVocabularies() {
  const dispatch = useAppDispatch()
  const vocabularies = useAppSelector(selectVocabularies)
  const isLoading = useAppSelector(selectIsLoading)

  useEffect(() => {
    dispatch(fetchVocabulariesThunk())
  }, [dispatch])

  return (
    <main className="flex flex-col items-center">
      {isLoading && <Loader />}

      <section>
        <div className="py-6 sticky top-0 bg-[#1d232a]">
          <h1 className="mb-6 text-4xl font-bold">Vocabularies</h1>
          <Link className="btn btn-success" to="/new">
            New vocabulary
          </Link>
        </div>

        <ul className="flex flex-col gap-5 pb-6">
          {vocabularies.map(vocabulary => {
            const { id, name, exercise } = vocabulary

            return (
              <li key={id}>
                <div className="flex gap-2 mb-4 font-bold text-2xl">
                  <h2>{name}</h2>
                  <p>({exercise})</p>
                </div>
                <div className="flex gap-2">
                  <Link className="btn btn-secondary" to={`/${id}`}>
                    Open
                  </Link>
                  <Link className="btn btn-primary" to={`/rename/${id}`}>
                    Rename
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      dispatch(deleteVocabularyThunk(id.toString()))
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
