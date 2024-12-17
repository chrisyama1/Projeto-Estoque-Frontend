import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Modal,
  Box,
} from '@mui/material';
import ProdutoEntrada from './ProdutoEntrada';
import ProdutoSaida from './ProdutoSaida';

const ProdutoLista = () => {
  /* CONSTANTES */
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [validadeFiltro, setValidadeFiltro] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false); // Novo estado para o modal de exclusão
  const [tipoModal, setTipoModal] = useState(''); // 'entrada' ou 'saida'
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  /* FUNÇÃO QUE BUSCA E APRESENTA A LISTA */
  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = () => {
    api.get('/produtos')
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  };

  /* FUNÇÃO PARA O BOTÃO EXCLUIR */
  const handleExcluirProduto = () => {
    if (produtoSelecionado) {
      api.delete(`/${produtoSelecionado.id}`)
        .then(() => {
          alert('Produto excluído com sucesso!');
          setModalExcluirOpen(false); // Fecha o modal de exclusão
          fetchProdutos();
        })
        .catch((error) => {
          console.error('Erro ao excluir produto:', error);
        });
    }
  };

  /* FUNÇÕES PARA ABRIR E FECHAR O MODAL */
  const handleOpenModal = (produto, tipo) => {
    setProdutoSelecionado(produto);
    setTipoModal(tipo); // 'entrada' ou 'saida'
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProdutoSelecionado(null);
    fetchProdutos();
  };

  /* FUNÇÃO PARA ABRIR O MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */
  const handleOpenModalExcluir = (produto) => {
    setProdutoSelecionado(produto);
    setModalExcluirOpen(true);
  };

  /* FUNÇÃO PARA FECHAR O MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */
  const handleCloseModalExcluir = () => {
    setModalExcluirOpen(false);
    setProdutoSelecionado(null);
  };

  /* FUNÇÃO PARA FILTRO DE BUSCA E VALIDADE */
  const lowerBusca = busca.toLowerCase();
  const produtosFiltradosComValidade = produtos.filter((produto) => {
    const incluiBusca = produto.nome.toLowerCase().includes(lowerBusca);
    const incluiValidade = validadeFiltro ? produto.validade === validadeFiltro : true;
    return incluiBusca && incluiValidade;
  });

  /* HTML */
  return (
    <div className="produto-lista-container">
      <Typography variant="h4" gutterBottom>
        Lista de Produtos
      </Typography>

      {/* Container para os filtros lado a lado */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Buscar produto..."
            variant="outlined"
            value={busca}
            onChange={(ev) => setBusca(ev.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="validade-label">Filtrar por Ano de Validade</InputLabel>
            <Select
              labelId="validade-label"
              value={validadeFiltro}
              onChange={(e) => setValidadeFiltro(e.target.value)}
              label="Ano de Validade"
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map((ano) => (
                <MenuItem key={ano} value={ano}>
                  {ano}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Tabela de Produtos */}
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Nome</strong></TableCell>
            <TableCell><strong>Quantidade</strong></TableCell>
            <TableCell><strong>Validade</strong></TableCell>
            <TableCell><strong>Ações</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produtosFiltradosComValidade.map((produto) => (
            <TableRow key={produto.id}>
              <TableCell>{produto.nome}</TableCell>
              <TableCell>{produto.quantidade}</TableCell>
              <TableCell>{produto.mes.slice(0, 3).toLowerCase()}/{produto.validade}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(produto, 'entrada')}
                  sx={{ mr: 1 }}
                >
                  Entrada
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleOpenModal(produto, 'saida')}
                  sx={{ mr: 1 }}
                >
                  Saída
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleOpenModalExcluir(produto)} // Abre o modal de confirmação
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de Confirmação de Exclusão */}
      <Modal open={modalExcluirOpen} onClose={handleCloseModalExcluir}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Tem certeza que deseja excluir este produto?
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleExcluirProduto}
            sx={{ mr: 2 }}
          >
            Confirmar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseModalExcluir}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {produtoSelecionado && tipoModal === 'entrada' && (
            <ProdutoEntrada produto={produtoSelecionado} onClose={handleCloseModal} />
          )}
          {produtoSelecionado && tipoModal === 'saida' && (
            <ProdutoSaida produto={produtoSelecionado} onClose={handleCloseModal} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProdutoLista;
