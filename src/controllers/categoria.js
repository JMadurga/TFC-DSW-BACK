const express = require('express');
const router = express.Router();
const { Categoria } = require('../models/Principal');


router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
});


router.post('/', async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.json({ message: 'Categoría creada correctamente', categoria });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ message: 'Error al crear categoría' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Categoria.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ message: 'Error al actualizar categoría' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Categoria.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
});

module.exports = router;
