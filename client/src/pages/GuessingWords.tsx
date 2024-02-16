import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectVocabulary } from "../redux/vocabularies/slice"
import { Vocabulary } from "../types/Vocabulary"
import { exerciseThunk } from "../redux/vocabularies/operations"

const countOfStrins = 6
let indecies: number[] = []
let countOfGuessedWords = 0
let correctInd = -1

const GuessingWords = () => {
  const dispatch = useAppDispatch()

  const vocabulary = useAppSelector(selectVocabulary) as Vocabulary

  const [buttonsInds, setButtonsInds] = useState<number[]>([])
  const [wrongInds, setWrongInds] = useState<number[]>([])

  const shuffleArray = useCallback((array: number[]) => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i]
      const randomIndex = getRandomNumber(0, array.length - 1)
      const anotherElement = array[randomIndex]
      array[i] = anotherElement
      array[randomIndex] = element
    }
  }, [])

  const fillButtonsInds = useCallback(() => {
    const rndIndex = getRandomNumber(0, indecies.length - 1)
    correctInd = indecies[rndIndex]
    const l = [indecies[rndIndex]]

    indecies.splice(rndIndex, 1)

    const minimal = Math.min(countOfStrins, vocabulary.firstLang.length)

    for (let i = 1; i < minimal; i++) {
      const rndIndexForButtns = getRandomNumber(
        0,
        vocabulary.firstLang.length - 1
      )

      if (l.includes(rndIndexForButtns) || correctInd === rndIndexForButtns) {
        i--
        continue
      }

      l.push(rndIndexForButtns)
    }

    shuffleArray(l)

    setButtonsInds(l)
  }, [shuffleArray, vocabulary.firstLang.length])

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const checkTheAnswer = (i: number) => {
    if (buttonsInds[i] === correctInd) {
      countOfGuessedWords++
      setWrongInds([])
      fillButtonsInds()
    } else {
      if (!wrongInds.includes(i)) setWrongInds(current => [...current, i])
    }

    if (vocabulary.firstLang.length - countOfGuessedWords === 0) {
      setButtonsInds([])
      correctInd = -1
      dispatch(exerciseThunk(vocabulary.id))
      restart()
    }
  }

  const restart = useCallback(() => {
    countOfGuessedWords = 0
    setWrongInds([])
    indecies = vocabulary.firstLang.map((_, i) => i)
    fillButtonsInds()
  }, [fillButtonsInds, vocabulary.firstLang])

  useEffect(() => {
    restart()
  }, [restart])

  return (
    <main>
      <div className="h1-plus-buttons">
        <h1>Left words: {vocabulary.firstLang.length - countOfGuessedWords}</h1>
        <Link className="btn btn-secondary" to={`/${vocabulary.id}`}>
          Cancel
        </Link>
        <a className="btn btn-success" onClick={restart}>
          Restart
        </a>
      </div>
      <div className="word-to-guess">{vocabulary.firstLang[correctInd]}</div>
      <div className="games-container">
        {buttonsInds.map((bIndex, i) => (
          <div
            className={
              "word words-variants " + (wrongInds.includes(i) ? "wrong" : "")
            }
            onClick={() => checkTheAnswer(i)}
            key={i}
          >
            {vocabulary.secLang[bIndex]}
          </div>
        ))}
      </div>
    </main>
  )
}

export default GuessingWords
