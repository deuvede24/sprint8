/*import User from './models/userModel.js';
import Book from './models/bookModel.js';


const insertInitialUserData = async () => {

  const userData = [
    {
      email: 'ismael.academy@gmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Ismael',
      roles: ['user']
    }, 
    {
      email: 'laura@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Laura',
      roles: ['user']
    },
    {
      email: 'maria@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Maria',
      surname: 'kale',
      roles: ['mod', 'admin']
    },
    {
      email: 'mod@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Moderador',
      surname: 'kale',
      roles: ['admin']
    },
    {
      email: 'admin@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Admin',
      surname: 'kale',
      roles: ['admin']
    }
  ];
  // Insertar datos con opción ignoreDuplicates
  // Para actualizar todas las filas: updateOnDuplicate: Object.keys(User.rawAttributes)
  await User.bulkCreate(userData, { ignoreDuplicates: true });
  

  // Insertar datos con opción ignoreDuplicates
  await Book.bulkCreate(bookData, { ignoreDuplicates: true });
}

export { insertInitialUserData };*/


// src/start_data.js
/*import bcrypt from 'bcrypt';
import User from './models/userModel.js';
import Recipe from './models/recipeModel.js';

const insertInitialData = async () => {
  const hashedPassword = await bcrypt.hash('password123', parseInt(process.env.BCRYPT_SALT));

  const userData = [
    {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin',
      surname: 'User',
      roles: ['admin'],
      photo: null,
      location: 'Location1',
      preference: 'original',
      avatar: null
    },
    {
      email: 'user@example.com',
      password: hashedPassword,
      name: 'User',
      surname: 'Example',
      roles: ['registered'],
      photo: null,
      location: 'Location2',
      preference: 'vegan',
      avatar: null
    },
    {
      email: 'guest@example.com',
      password: 'hashedpassword3',
      name: 'Guest',
      surname: null,
      roles: ['guest'],
      photo: null,
      location: 'Location3',
      preference: 'vegetarian',
      avatar: null
    },
  ]; await User.bulkCreate(userData, { ignoreDuplicates: true });

  const recipeData = [
    {
      user_id: 1,
      title: 'Spaghetti Bolognese',
      ingredients: 'Spaghetti, Tomato Sauce, Ground Beef',
      instructions: 'Cook spaghetti, prepare sauce, mix together',
      status: 1
    },
    {
      user_id: 2,
      title: 'Chicken Salad',
      ingredients: 'Chicken, Lettuce, Tomatoes, Dressing',
      instructions: 'Cook chicken, mix ingredients, add dressing',
      status: 1
    }
  ];

  await Recipe.bulkCreate(recipeData, { ignoreDuplicates: true });
 

  

 
};

export default insertInitialData;*/

import bcrypt from 'bcrypt';
import User from './models/userModel.js';
import Recipe from './models/recipeModel.js';
import Ingredient from './models/ingredientModel.js';
import RecipeIngredient from './models/recipeIngredientModel.js';
import Comment from './models/commentModel.js';
import Favorite from './models/favoriteModel.js';

const insertInitialData = async () => {
  const hashedPassword = await bcrypt.hash('password123', parseInt(process.env.BCRYPT_SALT));

  const userData = [
    {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin',
      surname: 'User',
      roles: ['admin'],
      photo: null,
      location: 'Location1',
      preference: 'original',
      avatar: null
    },
    {
      email: 'user@example.com',
      password: hashedPassword,
      name: 'User',
      surname: 'Example',
      roles: ['registered'],
      photo: null,
      location: 'Location2',
      preference: 'vegan',
      avatar: null
    },
    {
      email: 'guest@example.com',
      password: 'hashedpassword3',
      name: 'Guest',
      surname: null,
      roles: ['guest'],
      photo: null,
      location: 'Location3',
      preference: 'vegetarian',
      avatar: null
    },
  ];

  await User.bulkCreate(userData, { ignoreDuplicates: true });

  const recipeData = [
    {
      user_id: 1,
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish with a rich, savory sauce.',
      steps: 'Cook spaghetti, prepare sauce, mix together',
      category: 'traditional',
      is_premium: 0
    },
    {
      user_id: 2,
      title: 'Chicken Salad',
      description: 'A fresh and healthy salad with grilled chicken.',
      steps: 'Cook chicken, mix ingredients, add dressing',
      category: 'traditional',
      is_premium: 0
    }
  ];

  // Create recipes and get their IDs
  await Recipe.bulkCreate(recipeData, { ignoreDuplicates: true });
  const recipes = await Recipe.findAll({ where: { title: ['Spaghetti Bolognese', 'Chicken Salad'] } });

  console.log('Recipes:', recipes);

  const ingredientData = [
    { name: 'Spaghetti' },
    { name: 'Tomato Sauce' },
    { name: 'Ground Beef' },
    { name: 'Lettuce' },
    { name: 'Tomatoes' },
    { name: 'Dressing' }
  ];

  // Create ingredients and get their IDs
  await Ingredient.bulkCreate(ingredientData, { ignoreDuplicates: true });
  const ingredients = await Ingredient.findAll({ where: { name: ['Spaghetti', 'Tomato Sauce', 'Ground Beef', 'Lettuce', 'Tomatoes', 'Dressing'] } });

  console.log('Ingredients:', ingredients);

  const commentData = [
    {
      content: 'Great recipe!',
      user_id: 1,
      recipe_id: 1,
    },
    {
      content: 'Loved it!',
      user_id: 2,
      recipe_id: 2,
    },
  ];
  await Comment.bulkCreate(commentData, { ignoreDuplicates: true });
  console.log('Comments inserted successfully');

  const favoriteData = [
    {
      user_id: 1,
      recipe_id: 2,
    },
    {
      user_id: 2,
      recipe_id: 1,
    },
  ];
  await Favorite.bulkCreate(favoriteData, { ignoreDuplicates: true });
  console.log('Favorites inserted successfully');


  const recipeIngredientsData = [
    { recipe_id: recipes[0].id_recipe, ingredient_id: ingredients[0].id_ingredient, quantity: '200g' },
    { recipe_id: recipes[0].id_recipe, ingredient_id: ingredients[1].id_ingredient, quantity: '100g' },
    { recipe_id: recipes[0].id_recipe, ingredient_id: ingredients[2].id_ingredient, quantity: '300g' },
    { recipe_id: recipes[1].id_recipe, ingredient_id: ingredients[3].id_ingredient, quantity: '150g' },
    { recipe_id: recipes[1].id_recipe, ingredient_id: ingredients[4].id_ingredient, quantity: '100g' },
    { recipe_id: recipes[1].id_recipe, ingredient_id: ingredients[5].id_ingredient, quantity: '50ml' }
  ];

  console.log('RecipeIngredientsData:', recipeIngredientsData);

  await RecipeIngredient.bulkCreate(recipeIngredientsData, { ignoreDuplicates: true });

  console.log('RecipeIngredients inserted successfully');
};

export default insertInitialData;



