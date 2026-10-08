import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import History from './pages/History'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>
          <img src="/weather.svg" alt="" className="logo" />
          Israel Weather
        </h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
