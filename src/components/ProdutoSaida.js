import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import api from '../services/api';

const ProdutoSaida = ({ produto, onClose }) => {
  const [quantidade, setQuantidade] = useState('');

  const handleSaida = (e) => {
    e.preventDefault();

    if (!quantidade) {
      alert('Por favor, insira a quantidade.');
      return;
    }
    if (parseInt(quantidade, 10) <= 0) {
      alert('A quantidade deve ser maior que zero.');
      return;
    }

    api.patch('/saida', {
      id: produto.id,
      quantidade: parseInt(quantidade, 10),
    })
      .then(() => {
        alert('Saída realizada com sucesso!');
        setQuantidade('');
        onClose(); // Fecha o modal e atualiza a lista no componente pai
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data); 
        } else {
          alert('Erro ao realizar a saída. Tente novamente.');
        }
      });
  };

  return (
    <Modal open={Boolean(produto)} onClose={onClose}>
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
        <Typography variant="h6" mb={2}>
          Saída de Produto
        </Typography>
        <Typography variant="subtitle1" mb={2}>
          {produto.nome}
        </Typography>
        <form onSubmit={handleSaida}>
          <TextField
            fullWidth
            label="Quantidade"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            variant="outlined"
            required
            sx={{ mb: 3 }}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Registrar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ProdutoSaida;
