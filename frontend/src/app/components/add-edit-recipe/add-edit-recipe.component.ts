/*import { Component } from '@angular/core';

@Component({
  selector: 'app-add-edit-recipe',
  standalone: true,
  imports: [],
  templateUrl: './add-edit-recipe.component.html',
  styleUrl: './add-edit-recipe.component.scss'
})
export class AddEditRecipeComponent {

}

UNENFOTQUE

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number | null;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      steps: ['', Validators.required],
      category: ['', Validators.required],
      is_premium: [false, Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id') ? Number(this.aRouter.snapshot.paramMap.get('id')) : null;
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.operacion = 'Editar ';
      this.getRecipe(this.id);
    }
  }

  getRecipe(id: number) {
    this.loading = true;
    this.recipeService.getRecipe(id).subscribe(
      (data: Recipe) => {
        this.loading = false;
        this.form.setValue({
          title: data.title,
          description: data.description,
          steps: data.steps,
          category: data.category,
          is_premium: data.is_premium
        });
      },
      (error) => {
        this.toastr.error('Error al cargar la receta', 'Error');
        this.loading = false;
      }
    );
  }

  saveRecipe() {
    const recipe: Recipe = {
      title: this.form.value.title,
      description: this.form.value.description,
      steps: this.form.value.steps,
      category: this.form.value.category,
      is_premium: this.form.value.is_premium,
      id: this.id ? this.id : 0
    };

    this.loading = true;

    if (this.id !== null) {
      // Es editar
      this.recipeService.updateRecipe(this.id, recipe).subscribe(
        () => {
          this.toastr.info(`La receta ${recipe.title} fue actualizada con éxito`, 'Receta Actualizada');
          this.loading = false;
          this.router.navigate(['/recipes']);
        },
        (error) => {
          this.toastr.error('Error al actualizar la receta', 'Error');
          this.loading = false;
        }
      );
    } else {
      // Es agregar
      this.recipeService.saveRecipe(recipe).subscribe(
        () => {
          this.toastr.success(`La receta ${recipe.title} fue registrada con éxito`, 'Receta Registrada');
          this.loading = false;
          this.router.navigate(['/recipes']);
        },
        (error) => {
          this.toastr.error('Error al registrar la receta', 'Error');
          this.loading = false;
        }
      );
    }
  }
}*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
import { ActivatedRoute } from '@angular/router';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';


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
    private aRouter: ActivatedRoute
  ) 
  
  {
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
      this.getRecipe(this.id);
    }
  }

  cancel() {
    this.router.navigate(['/recipes']);
  }

  getRecipe(id: number) {
    this.loading = true;
    this.recipeService.getRecipe(id).subscribe({
      next: (data: Recipe) => {
        this.loading = false;
        this.form.setValue({
          title: data.title,
          description: data.description,
          steps: data.steps,
          category: data.category,
          is_premium: data.is_premium
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

