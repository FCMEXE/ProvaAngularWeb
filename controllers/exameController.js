const express = require('express');
const Exame = require('../models/Exame');
const router = express.Router();

router.get('/', async (req, res) => {
    const exames = await Exame.find().populate('id_cliente');
    res.json(exames);
});

router.get('/:id', async (req, res) => {
    const exame = await Exame.findById(req.params.id).populate('id_cliente');
    res.json(exame);
});

router.post('/', async (req, res) => {
    const exame = new Exame(req.body);
    await exame.save();
    res.status(201).json(exame);
});

router.patch('/:id', async (req, res) => {
    const exame = await Exame.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(exame);
});

router.delete('/:id', async (req, res) => {
    await Exame.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exame deletado' });
});

module.exports = router;
