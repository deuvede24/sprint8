/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Recipe } from '../interfaces/recipe.interface';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = `${environment.apiUrl}/recipes`;  // Aquí se usará la URL del entorno

  constructor(private http: HttpClient) { }

  //getRecipes(): Observable<Recipe[]> {
    // return this.http.get<Recipe[]>(this.apiUrl, { withCredentials: true });
  // }

  getRecipes(): Observable<{ code: number; message: string; data: Recipe[] }> {
    return this.http.get<{ code: number; message: string; data: Recipe[] }>(this.apiUrl, { withCredentials: true });
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  updateRecipe(id: number, recipe: Recipe): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  saveRecipe(recipe: Recipe) {
    return this.http.post(`${this.apiUrl}/recipes`, recipe);
  }
}*/


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Recipe } from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = `${environment.apiUrl}/recipes`;  // Aquí se usará la URL del entorno

  constructor(private http: HttpClient) { }

   /*getRecipes(): Observable<{ code: number; message: string; data: Recipe[] }> {
     return this.http.get<{ code: number; message: string; data: Recipe[] }>(this.apiUrl, { withCredentials: true });
   }
 
   getRecipeById(id: number): Observable<Recipe> {
     return this.http.get<Recipe>(`${this.apiUrl}/${id}`, { withCredentials: true });
   }
 
   addRecipe(recipe: Recipe): Observable<Recipe> {
     return this.http.post<Recipe>(this.apiUrl, recipe, { withCredentials: true });
   }
   
 
   updateRecipe(id: number, recipe: Recipe): Observable<void> {
     return this.http.put<void>(`${this.apiUrl}/${id}`, recipe, { withCredentials: true });
   }
 
   deleteRecipe(id: number): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
   }
 
   saveRecipe(recipe: Recipe): Observable<Recipe> {
     // Esto está redundante y causará una URL incorrecta
     return this.http.post<Recipe>(this.apiUrl, recipe, { withCredentials: true });
   }*/


  // Obtener todas las recetas con código, mensaje y data
 getRecipes(): Observable<{ code: number; message: string; data: Recipe[] }> {
    return this.http.get<{ code: number; message: string; data: Recipe[] }>(this.apiUrl, { withCredentials: true });
  }

  // Obtener una receta por ID
  getRecipeById(id: number): Observable<{ code: number; message: string; data: Recipe }> {
    return this.http.get<{ code: number; message: string; data: Recipe }>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Agregar una nueva receta
  addRecipe(recipe: Recipe): Observable<{ code: number; message: string; data: Recipe }> {
    return this.http.post<{ code: number; message: string; data: Recipe }>(this.apiUrl, recipe, { withCredentials: true });
  }

  // Actualizar una receta existente
  updateRecipe(id: number, recipe: Recipe): Observable<{ code: number; message: string }> {
    return this.http.put<{ code: number; message: string }>(`${this.apiUrl}/${id}`, recipe, { withCredentials: true });
  }

  // Eliminar una receta
  deleteRecipe(id: number): Observable<{ code: number; message: string }> {
    return this.http.delete<{ code: number; message: string }>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Método para guardar receta
  saveRecipe(recipe: Recipe): Observable<{ code: number; message: string; data: Recipe }> {
    return this.http.post<{ code: number; message: string; data: Recipe }>(this.apiUrl, recipe, { withCredentials: true });
  }

 /* getRecipeCategoryCount() {
    return this.http.get<{ code: number; message: string; data: any[] }>('/recipes/category-count');
  }*/

  getRecipeCategoryCount(): Observable<{ code: number; message: string; data: any[] }> {
    return this.http.get<{ code: number; message: string; data: any[] }>(`${this.apiUrl}/category-count`, { withCredentials: true });
  }
  

}
