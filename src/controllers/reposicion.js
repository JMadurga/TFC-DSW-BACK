
const express = require('express');
const router = express.Router();
const { Reposicion, ReposicionProducto, Producto, Trabajador } = require('../models/Principal');


router.get('/', async (req, res) => {
  try {
    const includeItems = req.query.include === 'items';
    const filas = await Reposicion.findAll({
      include: includeItems ? [
        { model: Trabajador, as: 'trabajador', attributes: ['id_trabajador', 'nombre', 'apellido', 'email'] },
        {
          model: ReposicionProducto, as: 'items',
          include: [{ model: Producto, as: 'producto', attributes: ['id_producto', 'nombre'] }]
        }
      ] : undefined
    });
    res.json(filas);
  } catch (error) {
    console.error('Error al obtener reposiciones:', error);
    res.status(500).json({ message: 'Error al obtener reposiciones' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const includeItems = req.query.include === 'items';
    const repo = await Reposicion.findOne({
      where: { id_reposicion: req.params.id },
      include: includeItems ? [
        { model: Trabajador, as: 'trabajador', attributes: ['id_trabajador', 'nombre', 'apellido', 'email'] },
        {
          model: ReposicionProducto, as: 'items',
          include: [{ model: Producto, as: 'producto', attributes: ['id_producto', 'nombre'] }]
        }
      ] : undefined
    });
    if (!repo) return res.status(404).json({ message: 'Reposición no encontrada' });
    res.json(repo);
  } catch (error) {
    console.error('Error al obtener reposición:', error);
    res.status(500).json({ message: 'Error al obtener reposición' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { id_trabajador, creacion } = req.body;
    if (!id_trabajador) return res.status(400).json({ message: 'id_trabajador es obligatorio' });

    const trabajador = await Trabajador.findByPk(id_trabajador);
    if (!trabajador) return res.status(400).json({ message: 'Trabajador no válido' });

    const repo = await Reposicion.create({ id_trabajador, creacion: creacion ?? new Date() });
    res.status(201).json({ message: 'Reposición creada correctamente', reposicion: repo });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear reposición' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Reposicion.update(req.body, { where: { id_reposicion: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Reposición no encontrada' });
    res.json({ message: 'Reposición actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar reposición' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Reposicion.destroy({ where: { id_reposicion: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Reposición no encontrada' });
    res.json({ message: 'Reposición eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar reposición:', error);
    res.status(500).json({ message: 'Error al eliminar reposición' });
  }
});

/* ITEMS DE LA REPOSICIÓN  */


router.get('/:id/items', async (req, res) => {
  try {
    const items = await ReposicionProducto.findAll({
      where: { id_reposicion: req.params.id },
      include: [{ model: Producto, as: 'producto', attributes: ['id_producto', 'nombre'] }],
    });
    res.json(items);
  } catch (error) {
    console.error('Error al obtener items de reposición:', error);
    res.status(500).json({ message: 'Error al obtener items de reposición' });
  }
});


router.post('/:id/items', async (req, res) => {
  const t = await Reposicion.sequelize.transaction();
  try {
    const { id_producto, unidades } = req.body;
    if (!id_producto || !Number.isInteger(unidades) || unidades <= 0) {
      return res.status(400).json({ message: 'id_producto y unidades (>0) son obligatorios' });
    }

    const [repo, prod] = await Promise.all([
      Reposicion.findByPk(req.params.id, { transaction: t }),
      Producto.findByPk(id_producto, { transaction: t }),
    ]);
    if (!repo) { await t.rollback(); return res.status(404).json({ message: 'Reposición no encontrada' }); }
    if (!prod) { await t.rollback(); return res.status(400).json({ message: 'Producto no válido' }); }

    const existing = await ReposicionProducto.findOne({
      where: { id_reposicion: repo.id_reposicion, id_producto },
      transaction: t
    });

    let item;
    if (existing) {
      item = await existing.update({ unidades: existing.unidades + unidades }, { transaction: t });
    } else {
      item = await ReposicionProducto.create({
        id_reposicion: repo.id_reposicion,
        id_producto,
        unidades,
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json({ message: 'Item añadido a reposición', item });
  } catch (error) {
    await t.rollback();
    console.error('Error al añadir item a reposición:', error);
    res.status(500).json({ message: 'Error al añadir item a reposición' });
  }
});

router.put('/:id/items/:itemId', async (req, res) => {
  try {
    const { unidades } = req.body;
    if (!Number.isInteger(unidades) || unidades <= 0) {
      return res.status(400).json({ message: 'unidades debe ser entero > 0' });
    }

    const [updated] = await ReposicionProducto.update(
      { unidades },
      { where: { id_reposicion_item: req.params.itemId, id_reposicion: req.params.id } }
    );
    if (!updated) return res.status(404).json({ message: 'Item de reposición no encontrado' });
    res.json({ message: 'Item actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar item:', error);
    res.status(500).json({ message: 'Error al actualizar item' });
  }
});


router.delete('/:id/items/:itemId', async (req, res) => {
  try {
    const deleted = await ReposicionProducto.destroy({
      where: { id_reposicion_item: req.params.itemId, id_reposicion: req.params.id }
    });
    if (!deleted) return res.status(404).json({ message: 'Item de reposición no encontrado' });
    res.json({ message: 'Item eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar item:', error);
    res.status(500).json({ message: 'Error al eliminar item' });
  }
});

module.exports = router;
