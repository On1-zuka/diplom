import './App.css'
import Header from './components/header/Header' 
import Footer from './components/footer/Footer'
import HomePage from './components/homePage/HomePage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './components/loginPage/LoginPage'



export default function App() {

  return (
    <BrowserRouter>
    <>
      <Header/>
      <main className='main'>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/products/:productItems" element={<HomePage/>}/>
            <Route path="/authorization" element={<LoginPage/>}/>
          </Routes>
      </main>
      <Footer/>
    </>
    </BrowserRouter>

  )
}
