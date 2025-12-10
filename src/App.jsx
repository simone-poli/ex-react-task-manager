import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { TaskList } from './pages/TaskList'
import { AddTask } from './pages/AddTask'
import { GlobalProvider } from './context/GlobalContext'

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <nav>
            <NavLink to="/">Lista task</NavLink>
            <NavLink to="/add">Aggiungi task</NavLink>
          </nav>



          <Routes>


            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />


          </Routes>
        </BrowserRouter>

      </GlobalProvider>
    </>
  )
}

export default App
