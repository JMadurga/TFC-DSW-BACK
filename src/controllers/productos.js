const express = require('express');
const router = express.Router();
const { Producto } = require('../models/Principal');


router.get('/', async (req, res) => {

  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error interno al obtener productos' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const {
    nombre,
    descripcion,
    stock,
    stock_minimo,
    id_categoria,
    id_clase_vino,
  } = req.body;

  if (!nombre || !id_categoria) {
    return res.status(400).json({
      message: 'Faltan campos obligatorios: nombre e id_categoria son requeridos',
    });
  }

  try {
    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      stock,
      stock_minimo,
      id_categoria,
      id_clase_vino,
    });

    res.status(201).json({
      message: 'Producto creado correctamente',
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
});

// Actualizar un producto existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    stock,
    stock_minimo,
    id_categoria,
    id_clase_vino,
  } = req.body;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await producto.update({
      nombre,
      descripcion,
      stock,
      stock_minimo,
      id_categoria,
      id_clase_vino,
    });

    res.json({
      message: 'Producto actualizado correctamente',
      producto,
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await producto.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

module.exports = router;