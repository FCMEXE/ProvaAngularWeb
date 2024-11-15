const express = require('express');
const Cliente = require('../models/Cliente');
const Exame = require('../models/Exame');
const router = express.Router();

router.get('/', async (req, res) => {
    const clientes = await Cliente.find();
    res.json(clientes);
});

router.get('/:id', async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);
    const exames = await Exame.find({ id_cliente: req.params.id });
    res.json({ cliente, exames });
});

router.post('/', async (req, res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
});

router.patch('/:id', async (req, res) => {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cliente);
});

router.delete('/:id', async (req, res) => {
    await Exame.deleteMany({ id_cliente: req.params.id });
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cliente e exames deletados' });
});

module.exports = router;
