import React, { useState } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import api from '../services/api';

const ProdutoEntrada = ({ produto, onClose }) => {
  const [quantidade, setQuantidade] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para registrar a entrada de produto
  const handleAdicionar = (e) => {
    e.preventDefault();

    if (!quantidade) {
      alert('Por favor, insira a quantidade.');
      return;
    }

    setLoading(true); // Inicia o indicador de carregamento

    // Simula a chamada API (substitua pela sua chamada real)
    api.patch('/entrada', {
      id: produto.id, // ID do produto recebido via props
      quantidade: parseInt(quantidade, 10),
    })
      .then(() => {
        alert('Quantidade adicionada com sucesso!');
        setQuantidade('');
        onClose(); // Fecha o modal após sucesso
      })
      .catch((error) => {
        console.error('Erro ao adicionar quantidade:', error);
      })
      .finally(() => {
        setLoading(false); // Finaliza o carregamento
      });
  };

  return (
    <Box
    sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 4,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 3,
      width: 400,
      maxWidth: '90%',
    }}
    >
      <Typography variant="h6" gutterBottom>
        Entrada de Produto
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {produto.nome}
      </Typography>
      <form onSubmit={handleAdicionar} style={{ width: '100%' }}>
        <TextField
          label="Quantidade"
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrar'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProdutoEntrada;
