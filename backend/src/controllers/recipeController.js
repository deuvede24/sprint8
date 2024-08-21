// src/controllers/recipeController.js
import Recipe from '../models/recipeModel.js';
import { validationResult } from 'express-validator';

/*export const getRecipes = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const recipes = await Recipe.findAll();
    res.status(200).json({
      code: 1,
      message: 'Recipes List',
      data: recipes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Error fetching recipes',
    });
  }
};*/

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json({
      code: 1,
      message: 'Recipes List',
      data: recipes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Error fetching recipes',
    });
  }
};


export const getRecipeById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({
        code: -6,
        message: 'Recipe not found'
      });
    }

    res.status(200).json({
      code: 1,
      message: 'Recipe Detail',
      data: recipe
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Error fetching recipe'
    });
  }
};

export const addRecipe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, ingredients, instructions } = req.body;
    let newRecipe;
    try {
      newRecipe = await Recipe.create({ title, ingredients, instructions, user_id: req.user.id_user });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          code: -61,
          message: 'Duplicate Recipe Title'
        });
      }
    }

    if (!newRecipe) {
      return res.status(404).json({
        code: -6,
        message: 'Error when adding the recipe'
      });
    }

    res.status(200).json({
      code: 1,
      message: 'Recipe Added Successfully',
      data: newRecipe
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Error adding recipe'
    });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, ingredients, instructions } = req.body;

    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({
        code: -3,
        message: 'Recipe not found'
      });
    }

    recipe.title = title;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    await recipe.save();

    res.status(200).json({
      code: 1,
      message: 'Recipe Updated Successfully',
      data: recipe
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Error updating recipe'
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const deletedRecipe = await Recipe.destroy({ where: { id_recipe: id } });

    if (!deletedRecipe) {
      return res.status(404).json({
        code: -100,
        message: 'Recipe not found'
      });
    }

    res.status(200).json({
      code: 1,
      message: 'Recipe Deleted Successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Error deleting recipe'
    });
  }
};

