import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../../services/recipe.service';
import { IngredientService } from '../../services/ingredient.service';  // Servicio para cargar ingredientes
import { Recipe } from '../../interfaces/recipe.interface';
import { Ingredient } from '../../interfaces/recipe-ingredient.interface';  // Importar la interfaz Ingredient
import { ActivatedRoute } from '@angular/router';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-edit-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {
  form: FormGroup;
  loading = false;
  id: number;
  allIngredients: Ingredient[] = [];  // Aquí cargaremos todos los ingredientes disponibles

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,  // Servicio para cargar ingredientes
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    public authService: AuthService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      steps: ['', Validators.required],
      category: ['', Validators.required],
      is_premium: [false, Validators.required],
      ingredients: this.fb.array([])  // FormArray para ingredientes
    });

    this.id = Number(this.aRouter.snapshot.paramMap.get('id') || 0);
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.getRecipeById(this.id);
    } else {
      this.loadAllIngredients(); // Cargar ingredientes si se va a agregar una receta nueva
    }
  }

  // Método para cargar todos los ingredientes disponibles desde el servicio
  loadAllIngredients(): void {
    this.ingredientService.getIngredients().subscribe({
      next: (ingredients: Ingredient[]) => {
        this.allIngredients = ingredients;
      },
      error: () => {
        this.toastr.error('Error al cargar los ingredientes', 'Error');
      }
    });
  }

  // Método para agregar un nuevo ingrediente al FormArray
  addIngredient() {
    const ingredientGroup = this.fb.group({
      ingredient_id: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    this.ingredients.push(ingredientGroup);
  }

  // Método para eliminar un ingrediente del FormArray
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  cancel() {
    this.router.navigate(['/recipes']);
  }

  /* getRecipeById(id: number) {
     this.loading = true;
     this.recipeService.getRecipeById(id).subscribe({
       next: (response: { code: number; message: string; data: Recipe }) => {
         this.form.setValue({
           title: response.data.title || '',
           description: response.data.description || '',
           steps: response.data.steps || '',
           category: response.data.category || '',
           is_premium: response.data.is_premium || false,
           ingredients: []  // Esto lo manejarás si hay ingredientes asociados
         });
         this.loading = false;
       },
       error: () => {
         this.toastr.error('Error al cargar la receta', 'Error');
         this.loading = false;
       }
     });
   }*/
  // Cargar receta por ID e inicializar el formulario con sus valores
  getRecipeById(id: number) {
    this.loading = true;
    this.recipeService.getRecipeById(id).subscribe({
      next: (response: { code: number; message: string; data: Recipe }) => {
        this.form.patchValue({
          title: response.data.title || '',
          description: response.data.description || '',
          steps: response.data.steps || '',
          category: response.data.category || '',
          is_premium: response.data.is_premium || false
        });

        // Cargar ingredientes en el FormArray si existen
        /*if (response.data.ingredients) {
          response.data.ingredients.forEach((ingredient) => {
            const ingredientGroup = this.fb.group({
              ingredient_id: [ingredient.ingredient_id, Validators.required],
              quantity: [ingredient.quantity, Validators.required]
            });
            this.ingredients.push(ingredientGroup);
          });
        }*/

        // Limpiar los ingredientes antes de agregarlos
        this.ingredients.clear();

        // Verificar si existen ingredientes antes de iterar
        /*  if (response.data.ingredients && response.data.ingredients.length > 0) {
            this.ingredients.clear();*/
        if (response.data.ingredients) {
          response.data.ingredients.forEach((ingredient) => {
            const ingredientGroup = this.fb.group({
              ingredient_id: [ingredient.ingredient_id, Validators.required],
              quantity: [ingredient.quantity, Validators.required]
            });
            this.ingredients.push(ingredientGroup);
          });
        }

        this.loading = false;
      },
      error: () => {
        this.toastr.error('Error al cargar la receta', 'Error');
        this.loading = false;
      }
    });
  }

  saveRecipe() {
    if (this.form.invalid) {
      return;
    }

    const recipe = { id: this.id, ...this.form.value };
    this.loading = true;

    if (this.id !== 0) {
      // Actualizar receta existente
      this.recipeService.updateRecipe(this.id, recipe).subscribe({
        next: (response: { code: number; message: string }) => {
          // Aquí estás usando el mensaje de la respuesta
          this.toastr.success(response.message, 'Receta Actualizada');
          this.loading = false;
          this.router.navigate(['/recipes']);
        },
        error: () => {
          this.toastr.error('Error al actualizar la receta', 'Error');
          this.loading = false;
        }
      });
    }
    else {
      this.recipeService.addRecipe(recipe).subscribe({
        next: (response: { code: number; message: string; data: Recipe }) => {
          this.toastr.success(response.message, 'Receta Registrada');
          this.loading = false;
          this.router.navigate(['/recipes']);
        },
        error: () => {
          //this.notificationService.showError('Error al registrar la receta');
          this.toastr.error('Error al registrar la receta', 'Error');
          this.loading = false;
        }
      });
    }
  }



}
