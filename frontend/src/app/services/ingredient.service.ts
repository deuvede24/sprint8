import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ingredient } from '../interfaces/recipe-ingredient.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = `${environment.apiUrl}/ingredients`;

  constructor(private http: HttpClient) {}

  // Método para obtener todos los ingredientes
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl, { withCredentials: true });
  }
}
