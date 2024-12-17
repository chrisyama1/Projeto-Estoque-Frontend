import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Box
} from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const adminUsername = 'admin'; // Defina o usuário do admin
    const adminPassword = 'admin'; // Defina a senha do admin

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem('auth', 'true'); // Salva a autenticação no localStorage
      localStorage.setItem('loginTime', Date.now());
      navigate('/'); // Redireciona para a página inicial
    } else {
      alert('Usuário ou senha incorretos!'); // Mostra mensagem de erro
    }
  };

  return (

    <Container
      maxWidth="xs"
      sx={{ mt: 8 }}
    >
  

      {/* Formulário de login */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Box textAlign="center" mb={3}>
          <img src={'https://i.imgur.com/LbQIrmR.png'} alt="Logo" style={{ width: '100%', maxWidth: '300px' }} />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            {/* Campo de Usuário */}
            <Grid item xs={12}>
              <TextField
                label="Usuário"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>

            {/* Campo de Senha */}
            <Grid item xs={12}>
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>

            {/* Botão de Login */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Entrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
