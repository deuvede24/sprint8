import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
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

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
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
    });

    this.id = Number(this.aRouter.snapshot.paramMap.get('id') || 0);
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.getRecipeById(this.id);
    }
  }

  cancel() {
    this.router.navigate(['/recipes']);
  }

  getRecipeById(id: number) {
    this.loading = true;
    this.recipeService.getRecipeById(id).subscribe({
      next: (data: Recipe) => {
        this.loading = false;
        this.form.setValue({
          title: data.title || '', // Asegúrate de que data.title no sea undefined
          description: data.description || '',
          steps: data.steps || '',
          category: data.category || '',
          is_premium: data.is_premium || false
        });
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
      this.recipeService.updateRecipe(this.id, recipe).subscribe({
        next: () => {
          this.toastr.success('La receta fue actualizada con éxito', 'Receta Actualizada');
          this.loading = false;
          this.router.navigate(['/recipes']);
        },
        error: () => {
          this.toastr.error('Error al actualizar la receta', 'Error');
          this.loading = false;
        }
      });
    } else {
      this.recipeService.saveRecipe(recipe).subscribe({
        next: () => {
          this.toastr.success('La receta fue registrada con éxito', 'Receta Registrada');
          this.loading = false;
          this.router.navigate(['/recipes']);
        },
        error: () => {
          this.toastr.error('Error al registrar la receta', 'Error');
          this.loading = false;
        }
      });
    }
  }

  
}
