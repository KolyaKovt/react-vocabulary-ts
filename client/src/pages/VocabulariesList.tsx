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
import { Container } from "../components/Container"

export default function ListVocabularies() {
  const dispatch = useAppDispatch()
  const vocabularies = useAppSelector(selectVocabularies)
  const isLoading = useAppSelector(selectIsLoading)

  useEffect(() => {
    dispatch(fetchVocabulariesThunk())
  }, [dispatch])

  return (
    <>
      {isLoading && <Loader />}

      <Container>
        <header className="w-[100%] py-6 sticky top-0 bg-[#1d232a]">
          <p className="mb-6 text-4xl font-bold">Vocabularies</p>
          <Link className="btn btn-success" to="/new">
            New vocabulary
          </Link>
        </header>

        <main>
          <section>
            <h1 className="visually-hidden">Vocabularies list</h1>
            <ul className="flex flex-col gap-5 pb-6">
              {vocabularies.map(vocabulary => {
                const { id, name, exercise } = vocabulary

                return (
                  <li key={id}>
                    <div className="flex gap-2 mb-4 font-bold text-2xl">
                      <h2>{name}</h2>
                      <p>({exercise})</p>
                    </div>
                    <ul className="flex gap-2">
                      <li>
                        <Link className="btn btn-secondary" to={`/${id}`}>
                          Open
                        </Link>
                      </li>
                      <li>
                        <Link className="btn btn-primary" to={`/rename/${id}`}>
                          Rename
                        </Link>
                      </li>
                      <li>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            dispatch(deleteVocabularyThunk(id.toString()))
                          }
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </li>
                )
              })}
            </ul>
          </section>
        </main>
      </Container>
    </>
  )
}
