import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomePage from './components/homePage/HomePage'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import LoginPage from './components/loginPage/LoginPage'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useEffect } from 'react'
import {useUser} from './context/UserContext'
import { useAuth } from './context/AuthContext'


export default function App() {
  
  const {user,setUser} = useUser();
  const {login} = useAuth();
  useEffect(()=>{
    (async()=>{const response =  await axios.get(`${process.env.API_BASE_URL}/users/check`, {
      withCredentials: true,
  }).then(
    res =>{if(res.data){
      setUser(res.data)
      login()
    }}
  );})()
    
},[]);


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
