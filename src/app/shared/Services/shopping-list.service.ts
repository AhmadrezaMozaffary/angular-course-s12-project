// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../ingredient.mode';

export class ShoppingListService {
  private _ingredients: Ingredient[] = [];

  ingredientsChanged = new Subject<Ingredient[]>();

  addIngs(ings: Ingredient[]) {
    // ings.forEach(ing => this.addIngredient(ing)) FIXME Bad practice
    this._ingredients.push(...ings);
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  addIngredient(ing: Ingredient) {
    this._ingredients.push(ing);
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  getIngredients() {
    return this._ingredients.slice();
  }
}
