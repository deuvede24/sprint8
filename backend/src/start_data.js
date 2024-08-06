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
import bcrypt from 'bcrypt';
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
      roles: ['admin']
    },
    {
      email: 'user@example.com',
      password: hashedPassword,
      name: 'User',
      surname: 'Example',
      roles: ['registered']
    },
    {
      email: 'guest@example.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', // pass: ismael123
      name: 'Guest',
      roles: ['guest']
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
 

  /*try {
    await User.bulkCreate(users, { ignoreDuplicates: true });
    await Recipe.bulkCreate(recipes, { ignoreDuplicates: true });
    console.log('Initial data inserted');
  } catch (error) {
    console.error('Error inserting initial data:', error);
  }*/
};

export default insertInitialData;
