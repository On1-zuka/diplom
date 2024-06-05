import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from './context/UserContext';
import { useAuth } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { user, setUser } = useUser();
  const { login } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${process.env.API_BASE_URL}/users/check`, {
        withCredentials: true,
      }).then(res => {
        if (res.data) {
          setUser(res.data);
          login();
        }
      });
    })();
  }, []);

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className='main'>
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
