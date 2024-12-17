import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import ProdutoLista from './components/ProdutoLista';
import ProdutoEntrada from './components/ProdutoEntrada';
import ProdutoSaida from './components/ProdutoSaida';
import ProdutoCriar from './components/ProdutoCriar';
import ProdutoRelatorio from './components/ProdutoRelatorio'; // Importe o componente de Relatório
import Navbar from './navbar'; 
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {

  const loginTime = localStorage.getItem('loginTime');
  const sessionDuration = 60 * 60 * 1000; // Duração da sessão: 1 hora

  // Verifica se o tempo de login expirou
  if (Date.now() - loginTime > sessionDuration) {
    localStorage.removeItem('auth');
    localStorage.removeItem('loginTime');
  }

  return (
    <Container sx={{ marginTop: '64px' }}>
      <Routes>
        {/* Rota de login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProdutoLista />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entrada/:id"
          element={
            <ProtectedRoute>
              <ProdutoEntrada />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saida/:id"
          element={
            <ProtectedRoute>
              <ProdutoSaida />
            </ProtectedRoute>
          }
        />
        <Route
          path="/criar"
          element={
            <ProtectedRoute>
              <ProdutoCriar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/relatorio"
          element={
            <ProtectedRoute>
              <ProdutoRelatorio />
            </ProtectedRoute>
          }
        />


        <Route path="*" element={<Login />} />
      </Routes>
    </Container>
  );
};

export default App;
