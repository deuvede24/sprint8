import { sequelize } from "../db.js";
import Ingredient from "../models/ingredientModel.js";
import Recipe from "../models/recipeModel.js";
import RecipeIngredient from "../models/recipeIngredientModel.js";

export const getMostUsedIngredients = async (req, res) => {
  try {
    const mostUsedIngredients = await Ingredient.findAll({
      include: [
        {
          model: Recipe,
          through: { model: RecipeIngredient }, // Sin alias, ya que no es necesario
          attributes: [],
        },
      ],
      attributes: [
        'name',
        [
          sequelize.fn('COUNT', sequelize.col('RecipeIngredients.ingredient_id')), // Cambiamos RecipeIngredients por RecipeIngredient
          'count',
        ],
      ],
      group: ['Ingredient.id_ingredient'],
      order: [[sequelize.literal('count'), 'DESC']],
      limit: 5, // Ajusta este valor según lo que necesites
    });

    console.log("Resultado de la consulta:", mostUsedIngredients);
    res.status(200).json(mostUsedIngredients);
  } catch (error) {
    console.error("Error al obtener los ingredientes más utilizados:", error);
    res.status(500).json({
      message: "Error al obtener los ingredientes más utilizados",
      error: error,
    });
  }
};


  
/*export const getMostUsedIngredients = async (req, res) => {
    try {
      const mostUsedIngredients = await Ingredient.findAll({
        include: {
          model: Recipe,
          through: {
            model: RecipeIngredient,
            as: 'RecipeIngredients',  // Asegúrate de que coincide con el nombre de la tabla
          },
          attributes: [],
        },
        attributes: [
          'name',
          [sequelize.fn('COUNT', sequelize.col('RecipeIngredients.ingredient_id')), 'count'],  // Usa el nombre exacto de la tabla y columna
        ],
        group: ['Ingredient.id_ingredient'],
        order: [[sequelize.literal('count'), 'DESC']],
        limit: 5,  // Ajusta según lo necesario
      });
  
      res.status(200).json(mostUsedIngredients);
    } catch (error) {
      console.error('Error al obtener los ingredientes más utilizados:', error);
      res.status(500).json({
        message: 'Error al obtener los ingredientes más utilizados',
        error: error,
      });
    }
  };*/
  
