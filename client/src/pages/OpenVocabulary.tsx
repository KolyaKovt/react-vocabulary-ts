import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { selectIsLoading, selectVocabulary } from "../redux/vocabularies/slice"
import {
  deleteWordThunk,
  fetchVocabularyThunk,
} from "../redux/vocabularies/operations"
import { Loader } from "../components/Loader"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

export default function OpenVocabulary() {
  const dispatch = useAppDispatch()
  const vocabulary = useAppSelector(selectVocabulary)
  const isLoading = useAppSelector(selectIsLoading)
  const { id } = useParams()

  useEffect(() => {
    if (id) dispatch(fetchVocabularyThunk(id))
  }, [dispatch, id])

  if (isLoading || !vocabulary) return <Loader />

  return (
    <main className="flex flex-col items-center">
      <h1 className="my-6">
        {vocabulary.name} (count: {vocabulary.firstLang.length})
      </h1>
      <div className="flex gap-2">
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
        <Link className="btn btn-success" to="add">
          Add words
        </Link>
        <Link className="btn btn-primary" to="play/connecting-words">
          Play connecting words
        </Link>
        <Link className="btn btn-dark" to="play/guessing-words">
          Play guessing word
        </Link>
      </div>
      {vocabulary.firstLang.map((word, index) => {
        const wordsId = vocabulary.wordsIds[index]
        const translation = vocabulary.secLang[index]

        return (
          <div className="" key={wordsId}>
            <div className="">
              <div className="">{word}</div>
              <div className="">{translation}</div>
            </div>
            <div className="">
              <Link to={`change/${wordsId}`} className="btn btn-primary">
                Change
              </Link>
              <a
                className="btn btn-danger"
                onClick={() => dispatch(deleteWordThunk(wordsId))}
              >
                Delete
              </a>
            </div>
          </div>
        )
      })}
    </main>
  )
}
