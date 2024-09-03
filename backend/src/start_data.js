import bcrypt from 'bcrypt';
import User from './models/userModel.js';
import Recipe from './models/recipeModel.js';
import Ingredient from './models/ingredientModel.js';
import RecipeIngredient from './models/recipeIngredientModel.js';
import Comment from './models/commentModel.js';
import Favorite from './models/favoriteModel.js';
import MapLocation from './models/mapModel.js';

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
      roles: ['user'],
      photo: null,
      location: 'Location2',
      preference: 'vegan',
      avatar: null
    },
   /* {
      email: 'guest@example.com',
      password: 'hashedpassword3',
      name: 'Guest',
      surname: null,
      roles: ['guest'],
      photo: null,
      location: 'Location3',
      preference: 'vegetarian',
      avatar: null
    },*/
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

  //await Comment.destroy({ where: {}, truncate: true });
  //await Favorite.destroy({ where: {}, truncate: true });

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

   // Datos de ejemplo para ubicaciones en Barcelona
   const mapLocationData = [
    {
      name: 'La Sagrada Familia',
      description: 'Una famosa basílica diseñada por Antoni Gaudí.',
      latitude: 41.4036,
      longitude: 2.1744
    },
    {
      name: 'Parc Güell',
      description: 'Un parque público con impresionantes obras de Gaudí.',
      latitude: 41.4145,
      longitude: 2.1527
    },
    {
      name: 'Casa Batlló',
      description: 'Un edificio modernista diseñado por Gaudí.',
      latitude: 41.3916,
      longitude: 2.1649
    },
    {
      name: 'Barri Gòtic (Barrio Gótico)',
      description: 'El casco antiguo de Barcelona con calles estrechas y arquitectura histórica.',
      latitude: 41.3833,
      longitude: 2.1833
    },
    {
      name: 'Museu Picasso',
      description: 'Un museo dedicado a las obras del pintor Pablo Picasso.',
      latitude: 41.3851,
      longitude: 2.1805
    }
  ];

  // Inserta las ubicaciones en la base de datos
  await MapLocation.bulkCreate(mapLocationData, { ignoreDuplicates: true });

  console.log('Ubicaciones del mapa insertadas correctamente.');

};

export default insertInitialData;



