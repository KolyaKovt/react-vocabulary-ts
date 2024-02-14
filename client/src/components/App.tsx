import { Route, Routes } from "react-router-dom"

import ListVocabularies from "../pages/ListVocabularies"
import NewVocabulary from "../pages/NewVocabulary"
import OpenVocabulary from "../pages/OpenVocabulary"
import RenameVocabulary from "../pages/RenameVocabulary"
import AddWords from "../pages/AddWords"
import ChangeWords from "../pages/ChangeWords"
import ConnectingWords from "../pages/ConnectingWords"
import { VocabularyLayout } from "./VocabularyLayout"
// import GuessingWords from "../pages/GuessingWords"

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ListVocabularies />} />
        <Route path="new" element={<NewVocabulary />} />
        <Route path="rename/:id" element={<RenameVocabulary />} />
        <Route path=":id" element={<VocabularyLayout />}>
          <Route index element={<OpenVocabulary />} />
          <Route path="play/connecting-words" element={<ConnectingWords />} />
          {/* <Route path="play/guessing-words" element={<GuessingWords />} /> */}
          <Route path="add" element={<AddWords />} />
          <Route path="change/:wordId" element={<ChangeWords />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
