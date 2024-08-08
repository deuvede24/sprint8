import Ingredient from '../models/ingredientModel.js';
import { validationResult } from 'express-validator';

export const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json({ ingredients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIngredientById = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByPk(id);
    if (ingredient) {
      res.status(200).json({ ingredient });
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addIngredient = async (req, res) => {
  try {
    const { name } = req.body;
    const newIngredient = await Ingredient.create({ name });
    res.status(201).json({ newIngredient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const ingredient = await Ingredient.findByPk(id);
    if (ingredient) {
      ingredient.name = name;
      await ingredient.save();
      res.status(200).json({ ingredient });
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Ingredient.destroy({ where: { id_ingredient: id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
