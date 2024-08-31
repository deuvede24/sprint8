/*import { Component } from '@angular/core';

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [],
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.scss'
})
export class ListRecipesComponent {

}*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
import { ToastrService } from 'ngx-toastr';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent implements OnInit {
  recipeList: Recipe[] = [];
  loading: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private toastr: ToastrService,
    private notificationService: NotificationService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRecipes();
  /* this.recipeList = [
    { id_recipe: 1, title: 'Test Recipe 1', description: 'Description 1', steps: '', category: '', is_premium: false, user_id: 1 },
    { id_recipe: 2, title: 'Test Recipe 2', description: 'Description 2', steps: '', category: '', is_premium: false, user_id: 2 }
  ];*/
  }

 /* getRecipes() {
    this.loading = true;
    console.log(this.recipeList.length)
    this.recipeService.getRecipes().subscribe({
      
      next: (data: Recipe[]) => {
        console.log(this.recipeList.length)
        console.log('Recetas obtenidas:',data); 
        this.recipeList = data;
        this.loading = false;
        console.log(this.recipeList.length)
        console.log('Contenido de this.recipes:', this.recipeList.length);
        console.log(this.recipeList.length)
      },
      error: (error) => {
        console.error('Error fetching recipes:', error); // Imprime el error en la consola
        this.toastr.error('Error al cargar las recetas', 'Error');
        this.loading = false;
      }
    });
  }*/

    getRecipes() {
      this.loading = true;
      this.recipeService.getRecipes().subscribe({
        next: (response: { code: number; message: string; data: Recipe[] }) => {
          console.log('Recetas obtenidas:', response.data); 
          this.recipeList = response.data;
          this.loading = false;
          console.log('Contenido de this.recipeList:', this.recipeList);
        },
        error: (error) => {
          console.error('Error fetching recipes:', error);
          this.toastr.error('Error al cargar las recetas', 'Error');
          this.loading = false;
        }
      });
    }
    

  editRecipe(id: number) {
    this.router.navigate([`/recipes/edit/${id}`]);
  }

  deleteRecipe(id: number) {
    this.loading = true;
    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        this.getRecipes(); // Recargar la lista después de eliminar
        this.toastr.success('La receta fue eliminada con éxito', 'Receta Eliminada');
        this.loading = false;
      },
      error: () => {
        //this.toastr.error('Error al eliminar la receta', 'Error');
        this.notificationService.showError('Error al eliminar la receta.');
        this.loading = false;
      }
    });
  }
}


