import './App.css'
import Header from './components/header/Header' 
import Footer from './components/footer/Footer'
import HomePage from './components/homePage/HomePage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

export default function App() {

  return (
    <BrowserRouter>
    <>
      <Header/>
      <main className='main'>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
          </Routes>
      </main>
      <Footer/>
    </>
    </BrowserRouter>

  )
}
