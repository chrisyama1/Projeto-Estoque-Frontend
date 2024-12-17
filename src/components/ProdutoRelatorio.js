import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import api from '../services/api';

const ProdutoRelatorio = () => {
  const [formato, setFormato] = useState("pdf");
  const [mes, setMes] = useState("");
  const [validade, setValidade] = useState("");
  const [meses, setMeses] = useState([]);
  const [anos, setAnos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const anoAtual = new Date().getFullYear();
    const anosDisponiveis = Array.from({ length: 20 }, (_, i) => anoAtual + i);
    setAnos(anosDisponiveis);
    setMeses([
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
    ]);
  }, []);

  const handleFormatoChange = (event) => setFormato(event.target.value);
  const handleMesChange = (event) => setMes(event.target.value);
  const handleValidadeChange = (event) => setValidade(event.target.value);

  const handleGerarRelatorio = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (mes) params.append("mes", mes);
    if (validade) params.append("validade", validade);
    params.append("formato", formato);

    try {
      const response = await api.get(`/relatorio/produtos?${params.toString()}`, {
        responseType: "blob",
      });

      if (response.status === 200) {
        const contentType = response.headers["content-type"];
        const blob = new Blob([response.data], { type: contentType });

        const fileExtension = contentType.includes("pdf") ? "pdf" : "xlsx";
        const contentDisposition = response.headers["content-disposition"];
        const fileName = contentDisposition
          ? contentDisposition.split("filename=")[1].replace(/"/g, "")
          : `relatorio_de_produtos.${fileExtension}`;

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        alert("Erro ao gerar relatório. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 4 }}
      >
        Emissão de Relatório de Produtos
      </Typography>

      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={3}>
          {/* Filtro Mês */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="mes-label">Mês</InputLabel>
              <Select
                labelId="mes-label"
                id="mes-input"
                value={mes}
                onChange={handleMesChange}
                label="Mês"
              >
                <MenuItem value="">
                <em>Todos</em>
                </MenuItem>
                {meses.map((m, index) => (
                  <MenuItem key={index} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Filtro Validade */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="validade-label">Ano de Validade</InputLabel>
              <Select
                labelId="validade-label"
                id="validade-input"
                value={validade}
                onChange={handleValidadeChange}
                label="Ano de Validade"
              >
                <MenuItem value="">
                 <em>Todos</em>
                 </MenuItem>
                {anos.map((ano, index) => (
                  <MenuItem key={index} value={ano}>
                    {ano}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Filtro Formato */}
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="formato-label">Formato</InputLabel>
              <Select
                labelId="formato-label"
                id="formato-input"
                value={formato}
                onChange={handleFormatoChange}
                label="Formato"
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Botão Gerar Relatório */}
          <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGerarRelatorio}
              disabled={loading}
              sx={{
                width: "100%",
                padding: 1.5,
                fontSize: "1rem",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Gerar Relatório"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProdutoRelatorio;
