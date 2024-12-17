import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,useLocation  } from 'react-router-dom'; 
import Navbar from './navbar'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
const Root = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login'; // Verifica se está na rota de login

  return (
    <>
      {!isLoginRoute && <Navbar />} 
      <App />
    </>
  );
};
/* RENDERIZAÇÃO DO ROOT */
root.render(
  <React.StrictMode>
    <Router>
      <Root />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
