import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Recipe from './recipeModel.js';
import Ingredient from './ingredientModel.js';

const RecipeIngredient = sequelize.define('RecipeIngredient', {
  recipe_id: {
    type: DataTypes.INTEGER(8).UNSIGNED,
    references: {
      model: Recipe,
      key: 'id_recipe'
    },
    primaryKey: true,
  },
  ingredient_id: {
    type: DataTypes.INTEGER(8).UNSIGNED,
    references: {
      model: Ingredient,
      key: 'id_ingredient'
    },
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  timestamps: false // No necesitamos created_at ni updated_at para este modelo
});

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, foreignKey: 'recipe_id' });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, foreignKey: 'ingredient_id' });

export default RecipeIngredient;
