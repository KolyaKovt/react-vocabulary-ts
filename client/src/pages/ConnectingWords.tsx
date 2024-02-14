import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { Loader } from "../components/Loader"

import {
  exerciseThunk,
  fetchVocabularyThunk,
} from "../redux/vocabularies/operations"
import { Vocabulary } from "../types/Vocabulary"

export default function ConnectingWords() {
  const dispatch = useAppDispatch()

  const vocabulary = useAppSelector(selectVocabulary) as Vocabulary
  const { id } = useParams()

  const [countOfStrins] = useState(7)
  const [indecies, setIndecies] = useState<number[]>([])
  const [countOfGuessedWords, setCountOfGuessedWords] = useState(0)

  const [currIndFL, setCurrIndFL] = useState<number[]>([])
  const [currIndSL, setCurrIndSL] = useState<number[]>([])

  const [selectedFL, setSelectedFL] = useState(-1)
  const [selectedSL, setSelectedSL] = useState(-1)

  const [guessedIndFL, setGuessedIndFL] = useState<number[]>([])
  const [guessedIndSL, setGuessedIndSL] = useState<number[]>([])

  const [wrongAnswer, setWrongAnswer] = useState(false)

  function clearSelected() {
    setSelectedFL(-1)
    setSelectedSL(-1)
  }

  const clearButtons = useCallback(() => {
    setGuessedIndFL([])
    setGuessedIndSL([])
    clearSelected()
  }, [])

  const getIndecies = useCallback(() => {
    setIndecies(vocabulary.firstLang.map((_, i) => i))
  }, [vocabulary.firstLang])

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const shuffleArray = useCallback((array: number[]) => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i]
      const randomIndex = getRandomNumber(0, array.length - 1)
      const anotherElement = array[randomIndex]
      array[i] = anotherElement
      array[randomIndex] = element
    }
  }, [])

  const fillCurrentWords = useCallback(() => {
    const fl = []
    const sl = []

    const minimal = Math.min(countOfStrins, indecies.length)

    for (let i = 0; i < minimal; i++) {
      const rndIndex = getRandomNumber(0, indecies.length - 1)

      fl.push(indecies[rndIndex])
      sl.push(indecies[rndIndex])

      indecies.splice(rndIndex, 1)
    }

    shuffleArray(sl)

    setCurrIndFL(fl)
    setCurrIndSL(sl)
  }, [countOfStrins, indecies, shuffleArray])

  const restart = useCallback(() => {
    setCountOfGuessedWords(0)
    clearButtons()
    getIndecies()
    fillCurrentWords()
  }, [clearButtons, fillCurrentWords, getIndecies])

  useEffect(() => {
    if (id) dispatch(fetchVocabularyThunk(id))
  }, [dispatch, id])

  const go = useCallback(() => {
    if (selectedFL === -1 || selectedSL === -1) return

    if (currIndFL[selectedFL] === currIndSL[selectedSL]) {
      setGuessedIndFL(current => [...current, selectedFL])
      setGuessedIndSL(current => [...current, selectedSL])
      setCountOfGuessedWords(prev => prev + 1)
      clearSelected()
    } else {
      setWrongAnswer(true)
      setTimeout(() => {
        setWrongAnswer(false)
        clearSelected()
      }, 500)
    }

    if (vocabulary.firstLang.length - countOfGuessedWords === 0)
      dispatch(exerciseThunk(vocabulary.id))
  }, [
    countOfGuessedWords,
    currIndFL,
    currIndSL,
    dispatch,
    selectedFL,
    selectedSL,
    vocabulary.firstLang.length,
    vocabulary.id,
  ])

  useEffect(() => {
    go()
  }, [go, selectedFL, selectedSL])

  useEffect(() => {
    restart()
  }, [restart])

  useEffect(() => {
    if (guessedIndFL.length === countOfStrins) {
      clearButtons()
      fillCurrentWords()
    }
  }, [clearButtons, countOfStrins, fillCurrentWords, guessedIndFL.length])

  if (!vocabulary) return <Loader />

  return (
    <main>
      <div className="h1-plus-buttons">
        <h1>Left words: {vocabulary.firstLang.length - countOfGuessedWords}</h1>
        <Link className="btn btn-secondary" to={`/${id}`}>
          Cancel
        </Link>
        <a className="btn btn-success" onClick={restart}>
          Restart
        </a>
      </div>
      <div className="games-container">
        {currIndFL.map((wIndex, i) => {
          return (
            <div className="word-pairs game" key={i}>
              <div
                className={
                  "word " +
                  (wrongAnswer && selectedFL === i
                    ? "wrong"
                    : guessedIndFL.includes(i)
                    ? "guessed"
                    : selectedFL === i
                    ? "selected"
                    : "")
                }
                onClick={() => {
                  if (wrongAnswer) return
                  selectedFL === i ? setSelectedFL(-1) : setSelectedFL(i)
                }}
              >
                {vocabulary.firstLang[wIndex]}
              </div>
              <div
                className={
                  "word " +
                  (wrongAnswer && selectedSL === i
                    ? "wrong"
                    : guessedIndSL.includes(i)
                    ? "guessed"
                    : selectedSL === i
                    ? "selected"
                    : "")
                }
                onClick={() => {
                  if (wrongAnswer) return
                  selectedSL === i ? setSelectedSL(-1) : setSelectedSL(i)
                }}
              >
                {vocabulary.secLang[currIndSL[i]]}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
