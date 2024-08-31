import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { FullcalendarComponent } from './components/fullcalendar/fullcalendar.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas protegidas por autenticación
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'fullcalendar', component: FullcalendarComponent, canActivate: [AuthGuard] },
  { path: 'charts', component: ChartsComponent, canActivate: [AuthGuard] },
  
  // Ruta para ver la lista de recetas (sin autenticación)
  { path: 'recipes', component: ListRecipesComponent }, 

  // Rutas protegidas para la administración de recetas
  { path: 'recipes/add', component: AddEditRecipeComponent, canActivate: [AuthGuard] },
  { path: 'recipes/edit/:id', component: AddEditRecipeComponent, canActivate: [AuthGuard] },
  { path: 'recipes/view/:id', component: ViewRecipeComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
