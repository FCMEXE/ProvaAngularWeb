const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const clienteRoutes = require('./controllers/clienteController');
const exameRoutes = require('./controllers/exameController');

dotenv.config();
const app = express();
app.use(express.json());

// Conectar ao MongoDB sem usar as opções obsoletas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/clientes', clienteRoutes);
app.use('/exames', exameRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));