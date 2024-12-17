import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth'); // Remove a autenticação
    navigate('/login'); // Redireciona para a página de login
    localStorage.removeItem('loginTime');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: '#1976d2', 
        width: '100%',  
        margin: '0 auto' 
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            src={'https://i.imgur.com/RaEdrzn.png'}
            alt="Logo"
            style={{ width: '40px', marginRight: '10px' }} 
          />
          

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/">
              Produtos
            </Button>
            <Button color="inherit" component={Link} to="/criar">
              Novo Produto
            </Button>
            <Button color="inherit" component={Link} to="/relatorio">
              Relatório de Produtos
            </Button> 
          </Box>
        </Box>


        <Button 
          color="inherit" 
          onClick={handleLogout} 
          sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', marginRight:'3%' }}
        >
          <ExitToAppIcon sx={{ marginRight: 1 }} /> {/* Ícone de logout */}
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
