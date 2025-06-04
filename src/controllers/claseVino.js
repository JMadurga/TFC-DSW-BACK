const express = require('express');
const router = express.Router();
const { ClaseVino } = require('../models/Principal');

 
router.get('/', async (req, res) => {
  try {
    const clases = await ClaseVino.findAll();
    res.json(clases);
  } catch (error) {
    console.error('Error al obtener clases de vino:', error);
    res.status(500).json({ message: 'Error al obtener clases de vino' });
  }
});


router.post('/', async (req, res) => {
  try {
    const clase = await ClaseVino.create(req.body);
    res.json({ message: 'Clase de vino creada correctamente', clase });
  } catch (error) {
    console.error('Error al crear clase de vino:', error);
    res.status(500).json({ message: 'Error al crear clase de vino' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await ClaseVino.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Clase de vino no encontrada' });
    res.json({ message: 'Clase de vino actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar clase de vino:', error);
    res.status(500).json({ message: 'Error al actualizar clase de vino' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await ClaseVino.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Clase de vino no encontrada' });
    res.json({ message: 'Clase de vino eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar clase de vino:', error);
    res.status(500).json({ message: 'Error al eliminar clase de vino' });
  }
});

module.exports = router;
