import { Routes } from '@angular/router';
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
];
