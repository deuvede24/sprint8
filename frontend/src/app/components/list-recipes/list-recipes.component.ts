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

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  loading: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this.loading = true;
    this.recipeService.getRecipes().subscribe({
      next: (data: Recipe[]) => {
        this.recipes = data;
        this.loading = false;
      },
      error: () => {
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
        this.toastr.error('Error al eliminar la receta', 'Error');
        this.loading = false;
      }
    });
  }
}


