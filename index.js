const express = require('express');
const app = express();

app.use(express.json());

app.post('/dados-bolao', (req, res) => {
  const {
    nome,
    quantidade,
    reais,
    titulo,
    localidade,
    telefone
  } = req.body;

  const dadosFormatados = {
    nome: nome || "Não informado",
    quantidade: quantidade || 0,
    valorPago: reais || "0",
    tituloBolao: titulo || "Sem título",
    local: localidade || "Desconhecido",
    telefone: telefone || "Não informado",
  };

  console.log('Recebido:', dadosFormatados);

  res.json({
    status: "OK",
    dados: dadosFormatados
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
