import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


export default function App() {

  return (
    <>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
