# Sprint 8 - CRUD Recipes with Map, Calendar, and Charts

## Description

The objective of this sprint was to implement a project using several common plugins that future clients may require in their projects. The data generated by these plugins is stored in a database, and we created an API using Node.js and MySQL. The project includes user registration, login functionality, and provides access to various features upon logging in.

Users can log in with:
- **Email:** `admin@example.com`
- **Password:** `password123`

Alternatively, users can register via the **Register** page.

The project covers the following functionalities:
- **Map:** Stores and displays locations with latitude and longitude using MapBox, including different categories with a filtering option. Users can also add new locations and edit existing ones by interacting with the map.
- **FullCalendar:** Allows users to add and delete events.
- **Charts (Chart.js):** Displays two types of charts, including a bar chart and line chart for visualizing recipe categories.

## Project Features

### User Registration and Login

- **Registration:** Users can register by providing a unique email and password.
- **Login:** Users can log in with their registered credentials.

### Map with Location Markers and Editing Capabilities

- **Location Storage:** Allows users to store a list of locations with latitude, longitude, name, description, and category.
- **Category Filtering:** Includes multiple categories for locations, and users can filter locations based on these categories.
- **Map Integration:** The map is implemented using **MapBox** and shows all stored locations with markers.
- **Double Click to Add Location:** Users can double-click on the map to add a new location with a form that appears for entering name, description, and category.
- **Edit and View Locations:** Double-clicking on any existing location marker opens a details panel where users can edit the location's information. Users can also navigate to a list of locations where editing is possible.

### FullCalendar Events

- **Event Management:** Users can view a calendar to which they can add, edit, or delete events.
- **Event API:** The events are stored in a backend API that allows CRUD operations for events on the calendar.

### Charts (Chart.js)

- **Charts Integration:** Displays two types of charts using **Chart.js**:
  - A **bar chart** representing the number of recipes by category (Vegan, Vegetarian, Traditional).
  - A **line chart** for visualizing various statistics related to recipe data.

## Tech Stack

- **Backend:** Node.js, Express, MySQL, Sequelize ORM
- **Frontend:** Angular 18, TypeScript, SCSS, HTML
- **Styling:** Bootstrap with Bootswatch's Solar theme
- **Database Management:** MySQL with phpMyAdmin
- **Map Integration:** MapBox API
- **Charts:** Chart.js
- **Calendar:** FullCalendar Plugin

## Screenshots

### Crud Recipes
![CRUD Recipes](https://github.com/deuvede24/sprint8/raw/main/screenshots/crud_recipes.jpeg)

### Map with Category Filters and Editing Panel

![Map with Category Filters](https://github.com/deuvede24/sprint8/raw/main/screenshots/crud_locations1.jpeg)

### CRUD Locations

![CRUD Locations]((https://github.com/deuvede24/sprint8/blob/main/screenshots/crud_editLocations.jpeg) (https://github.com/deuvede24/sprint8/blob/main/screenshots/crud_locationsList.jpeg))

### FullCalendar

![FullCalendar](https://github.com/deuvede24/sprint8/raw/main/screenshots/crud_calendarModal.jpeg)

### Charts

![Charts](https://github.com/deuvede24/sprint8/raw/main/screenshots/charts.jpeg)

## Installation Instructions

1. **Clone the project repository:**

    ```bash
    git clone https://github.com/your_username/your_repository.git
    cd your_repository
    ```

2. **Install project dependencies:**

    ```bash
    npm install
    ```

3. **Set up the MySQL Database:**
    - Create a MySQL database.
    - Configure the database connection in the `.env` file.

4. **Run database migrations:**

    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Start the backend server:**

    ```bash
    npm run dev
    ```

6. **Start the Angular frontend:**

    ```bash
    ng serve
    ```

7. **Access the application:**
    - The frontend will run at `http://localhost:4200/`
    - The backend API will run at `http://localhost:3000/`
