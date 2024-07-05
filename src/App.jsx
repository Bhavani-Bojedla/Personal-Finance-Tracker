import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import History from './Pages/History'
import Profile from './Pages/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/history' element={<History/>}/>
      <Route path='/profile' element={<Profile/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
