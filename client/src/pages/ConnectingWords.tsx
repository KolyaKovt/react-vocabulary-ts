import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { Loader } from "../components/Loader"

import { exerciseThunk } from "../redux/vocabularies/operations"
import { Vocabulary } from "../types/Vocabulary"
import { Container } from "../components/Container"
import { Header } from "../components/Header"

const countOfStrins = 7
let indecies: number[] = []
let countOfGuessedWords: number = 0

export default function ConnectingWords() {
  const dispatch = useAppDispatch()

  const vocabulary = useAppSelector(selectVocabulary) as Vocabulary

  const [currIndFL, setCurrIndFL] = useState<number[]>([])
  const [currIndSL, setCurrIndSL] = useState<number[]>([])

  const [selectedFL, setSelectedFL] = useState(-1)
  const [selectedSL, setSelectedSL] = useState(-1)

  const [guessedIndFL, setGuessedIndFL] = useState<number[]>([])
  const [guessedIndSL, setGuessedIndSL] = useState<number[]>([])

  const [wrongAnswer, setWrongAnswer] = useState(false)

  const clearSelected = () => {
    setSelectedFL(-1)
    setSelectedSL(-1)
  }

  const clearButtons = useCallback(() => {
    setGuessedIndFL([])
    setGuessedIndSL([])
    clearSelected()
  }, [])

  const getIndecies = useCallback(() => {
    indecies = vocabulary.firstLang.map((_, i) => i)
  }, [vocabulary.firstLang])

  const getRandomNumber = (min: number, max: number) => {
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
  }, [shuffleArray])

  const restart = useCallback(() => {
    countOfGuessedWords = 0
    clearButtons()
    getIndecies()
    fillCurrentWords()
  }, [clearButtons, fillCurrentWords, getIndecies])

  const go = useCallback(() => {
    if (selectedFL === -1 || selectedSL === -1) return

    if (currIndFL[selectedFL] === currIndSL[selectedSL]) {
      setGuessedIndFL(current => [...current, selectedFL])
      setGuessedIndSL(current => [...current, selectedSL])
      countOfGuessedWords++
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
    currIndFL,
    currIndSL,
    dispatch,
    selectedFL,
    selectedSL,
    vocabulary.firstLang.length,
    vocabulary.id,
  ])

  useEffect(() => {
    restart()
  }, [restart])

  useEffect(() => {
    go()
  }, [go, selectedFL, selectedSL])

  useEffect(() => {
    if (guessedIndFL.length === countOfStrins) {
      clearButtons()
      fillCurrentWords()
    }
  }, [clearButtons, fillCurrentWords, guessedIndFL.length])

  if (!vocabulary) return <Loader />

  return (
    <Container>
      <Header>
        <p className="mainTitle mb-6">
          Left words: {vocabulary.firstLang.length - countOfGuessedWords}
        </p>
        <div className="btnContainer">
          <Link className="btn btn-secondary" to={`/${vocabulary.id}`}>
            Cancel
          </Link>
          <a className="btn btn-success" onClick={restart}>
            Restart
          </a>
        </div>
      </Header>

      <main className="w-[100%]">
        <section>
          <h1 className="visually-hidden">plaing connecting words</h1>
          <ul className="wordsColumn mb-6">
            {currIndFL.map((index, i) => (
              <li
                key={i}
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
                {vocabulary.firstLang[index]}
              </li>
            ))}
          </ul>

          <ul className="wordsColumn">
            {currIndSL.map((index, i) => (
              <li
                key={i}
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
                {vocabulary.secLang[index]}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Container>
  )
}
