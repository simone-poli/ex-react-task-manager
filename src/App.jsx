import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './Nav'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Nav />

          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddList />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
