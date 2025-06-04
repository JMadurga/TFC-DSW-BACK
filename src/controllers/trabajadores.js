const express = require('express');
const router = express.Router();
const { Trabajador } = require('../models/Principal'); 



router.get('/', async (req, res) => {
  try {
    const trabajadores = await Trabajador.findAll();
    res.json(trabajadores);
  } catch (error) {
    console.error('Error al obtener trabajadores:', error);
    res.status(500).json({ message: 'Error interno al obtener trabajadores' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {nombre, apellido, email, telefono, direccion, puesto, fecha_contratacion} = req.body;

  try {
    const trabajador = await Trabajador.findByPk(id);
    if (!trabajador) {
      return res.status(404).json({ message: 'Trabajador no encontrado' });
    }

    await trabajador.update({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      puesto,
      fecha_contratacion
    });

    res.json({
      message: 'Trabajador actualizado correctamente',
      trabajador
    });
  } catch (error) {
    console.error('Error al actualizar trabajador:', error);
    res.status(500).json({ message: 'Error al actualizar trabajador' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const trabajador = await Trabajador.findByPk(id);
    if (!trabajador) {
      return res.status(404).json({ message: 'Trabajador no encontrado' });
    }

    await trabajador.destroy();
    res.json({ message: 'Trabajador eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar trabajador:', error);
    res.status(500).json({ message: 'Error al eliminar trabajador' });
  }
});

module.exports = router;

