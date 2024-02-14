import { Link } from "react-router-dom"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { deleteWordThunk } from "../redux/vocabularies/operations"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { Vocabulary } from "../types/Vocabulary"

export default function OpenVocabulary() {
  const dispatch = useAppDispatch()
  const vocabulary = useAppSelector(selectVocabulary) as Vocabulary

  return (
    <main className="flex flex-col items-center">
      <div className="py-6 sticky top-0 bg-[#1d232a]">
        <h1 className="mb-6 text-4xl font-bold">
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
