import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable()
export class DataStorageService {
  private _ENDPOINT_ = 'https://wxnpqlaktdrmxzupzgow.supabase.co/rest/v1/';
  private _API_KEY_ =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bnBxbGFrdGRybXh6dXB6Z293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI0NDI4MzYsImV4cCI6MTk3ODAxODgzNn0.2vYWsMuL0j9WUtLHMPAtjQTrDxVyK9fMzzoQZFKwSQ4';

  constructor(private http: HttpClient, private RS: RecipeService) {}

  setRecipes() {
    const recipes = this.RS.getRecipes();
    const _finalEndpoint = `${this._ENDPOINT_}storage`;
    const _reqOption = {
      headers: new HttpHeaders({
        apikey: this._API_KEY_,
        Authorization: `Bearer ${this._API_KEY_}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      }),
    };

    //SUPABASE does NOT suppourt put method
    return this.http.post(
      _finalEndpoint,
      {
        recipes: recipes,
      },
      _reqOption
    );
  }

  getRecipes() {
    const _finalEndpoint = `${this._ENDPOINT_}storage`;
    const _reqOption = {
      headers: new HttpHeaders({
        apikey: this._API_KEY_,
        Authorization: `Bearer ${this._API_KEY_}`,
      }),
      params: new HttpParams().set('select', 'recipes'),
    };

    return this.http.get(_finalEndpoint, _reqOption).pipe(
      map((recipes: any[]) => {
        return recipes[recipes.length - 1]['recipes'].map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients || [],
          };
        });
      })
    );
  }
}
