/*import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { FullcalendarComponent } from './components/fullcalendar/fullcalendar.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'fullcalendar', component: FullcalendarComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'recipes', component: ListRecipesComponent },
  { path: 'recipes/add', component: AddEditRecipeComponent },
  { path: 'recipes/edit/:id', component: AddEditRecipeComponent },
  { path: 'recipes/view/:id', component: ViewRecipeComponent },
];*/

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
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'fullcalendar', component: FullcalendarComponent, canActivate: [AuthGuard] },
  { path: 'charts', component: ChartsComponent, canActivate: [AuthGuard] },
  { path: 'recipes', component: ListRecipesComponent, canActivate: [AuthGuard] },
  { path: 'recipes/add', component: AddEditRecipeComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'recipes/edit/:id', component: AddEditRecipeComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'recipes/view/:id', component: ViewRecipeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

