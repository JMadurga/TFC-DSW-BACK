const express = require('express');
const router = express.Router();
const { Trabajador } = require('../models/Principal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const generarToken = (trabajador) => {
  const payload = {
    id: trabajador.id_trabajador,
    email: trabajador.email,
    nombre: trabajador.nombre,
    puesto: trabajador.puesto,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};


router.post('/register', async (req, res) => {
  const { nombre, apellido, email, password, telefono, direccion, puesto, fecha_contratacion } = req.body;

  try {
    const trabajadorExistente = await Trabajador.findOne({ where: { email } });
    if (trabajadorExistente) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const nuevoTrabajador = await Trabajador.create({
      nombre,
      apellido,
      email,
      secure_password: password, 
      telefono,
      direccion,
      puesto,
      fecha_contratacion,
    });

    const token = generarToken(nuevoTrabajador);

    res.status(201).json({
      message: 'Trabajador registrado correctamente',
      trabajador: {
        id: nuevoTrabajador.id_trabajador,
        nombre: nuevoTrabajador.nombre,
        email: nuevoTrabajador.email,
        puesto: nuevoTrabajador.puesto,
      },
      token,
    });
  } catch (error) {
    console.error('Error al registrar trabajador:', error);
    res.status(500).json({ message: 'Error al registrar trabajador' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }

  try {
    const trabajador = await Trabajador.findOne({ where: { email } });
    if (!trabajador || !(await trabajador.validPassword(password))) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = generarToken(trabajador);

    res.json({
      message: 'Login exitoso',
      trabajador: {
        id: trabajador.id_trabajador,
        nombre: trabajador.nombre,
        email: trabajador.email,
        puesto: trabajador.puesto,
      },
      token,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

module.exports = router;
