import { Link } from "react-router-dom"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { deleteWordThunk } from "../redux/vocabularies/operations"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { Vocabulary } from "../types/Vocabulary"
import { Container } from "../components/Container"
import { Header } from "../components/Header"

export default function OpenVocabulary() {
  const dispatch = useAppDispatch()
  const vocabulary = useAppSelector(selectVocabulary) as Vocabulary

  return (
    <Container>
      <Header>
        <p className="mainTitle mb-6">
          {vocabulary.name} (count: {vocabulary.firstLang.length})
        </p>
        <ul className="btnContainer">
          <li>
            <Link className="btn btn-secondary" to="/">
              Cancel
            </Link>
          </li>
          <li>
            <Link className="btn btn-success" to="add">
              Add words
            </Link>
          </li>
          <li>
            <Link className="btn btn-primary" to="play/connecting-words">
              Play connecting words
            </Link>
          </li>
          <li>
            <Link className="btn btn-dark" to="play/guessing-words">
              Play guessing word
            </Link>
          </li>
        </ul>
      </Header>

      <main>
        <section>
          <h1 className="visually-hidden">Words list</h1>
          <ul className="itemsList">
            {vocabulary.firstLang.map((word, index) => {
              const wordsId = vocabulary.wordsIds[index]
              const translation = vocabulary.secLang[index]

              return (
                <li className="container-for-word-pairs" key={wordsId}>
                  <div className="wordPairs">
                    <div className="word">{word}</div>
                    <div className="word">{translation}</div>
                  </div>
                  <div className="btnContainer">
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
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    </Container>
  )
}
