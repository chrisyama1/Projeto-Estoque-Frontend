import React, { useState,useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';
import api from '../services/api';

const ProdutoCriar = () => {
  /* CONSTANTES */
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [mes, setMes] = useState('');
  const [anos, setAnos] = useState([]);


  useEffect(() => {
    const anoAtual = new Date().getFullYear();
    const anosDisponiveis = Array.from({ length: 20 }, (_, i) => anoAtual + i); // Gera 20 anos a partir do ano atual
    setAnos(anosDisponiveis);
  }, []);

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  /* FUNÇÃO PARA CRIAR O PRODUTO */
  const handleCriarProduto = (e) => {
    e.preventDefault();
    if (!nome || !quantidade || !validade || !mes) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    api.post('/criar', { nome, quantidade, validade, mes })
      .then(response => {
        alert('Produto criado com sucesso!');
        setNome('');
        setQuantidade('');
        setValidade('');
        setMes('');
      })
      .catch(error => {
        console.error('Erro ao criar produto:', error);
        alert('Erro ao criar o produto. Tente novamente.');
      });
  };




  return (
<div className="formulario-container">
      <Typography variant="h4" gutterBottom>
        Criar Produto
      </Typography>
      <form onSubmit={handleCriarProduto}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="nome-input"
              label="Nome"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do produto"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="quantidade-input"
              label="Quantidade"
              type="number"
              variant="outlined"
              fullWidth
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              placeholder="Quantidade"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="validade-label">Ano de Validade</InputLabel>
              <Select
                labelId="validade-label"
                id="validade-input"
                value={validade}
                onChange={(e) => setValidade(e.target.value)}
                label="Ano de Validade"
                required
              >
                {anos.map((ano) => (
                  <MenuItem key={ano} value={ano}>
                    {ano}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="mes-label">Mês</InputLabel>
              <Select
                labelId="mes-label"
                id="mes-input"
                value={mes}
                onChange={(e) => setMes(e.target.value)}
                label="Mês"
                required
              >
                {meses.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Criar Produto
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};


export default ProdutoCriar;

    