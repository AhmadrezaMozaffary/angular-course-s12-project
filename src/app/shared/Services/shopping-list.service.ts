import { EventEmitter } from '@angular/core';

import { Ingredient } from '../ingredient.mode';

export class ShoppingListService {
  private _ingredients: Ingredient[] = [];

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  addIngs(ings: Ingredient[]) {
    // ings.forEach(ing => this.addIngredient(ing)) FIXME Bad practice
    this._ingredients.push(...ings);
    this.ingredientsChanged.emit(this._ingredients.slice());
  }

  addIngredient(ing: Ingredient) {
    this._ingredients.push(ing);
    this.ingredientsChanged.emit(this._ingredients.slice());
  }

  getIngredients() {
    return this._ingredients.slice();
  }
}
