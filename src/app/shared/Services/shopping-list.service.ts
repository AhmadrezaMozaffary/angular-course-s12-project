// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../ingredient.mode';

export class ShoppingListService {
  private _ingredients: Ingredient[] = [];

  ingredientsChanged = new Subject<Ingredient[]>();
  startEditIngredient = new Subject<number>();
  ingsLength = new Subject<number>();

  addIngs(newIngs: Ingredient[]) {
    // ings.forEach(ing => this.addIngredient(ing)) FIXME Bad practice
    this._ingredients.push(...newIngs);
    this.ingredientsChanged.next(this._ingredients.slice());
    this.ingsLength.next(this._ingredients.length);
  }

  addIngredient(ing: Ingredient) {
    this._ingredients.push(ing);
    this.ingredientsChanged.next(this._ingredients.slice());
    this.ingsLength.next(this._ingredients.length);
  }
  
  editIng(index: number, newIng: Ingredient) {
    this._ingredients[index] = newIng;
    this.ingredientsChanged.next(this._ingredients.slice());
  }
  
  getIngredients() {
    return this._ingredients.slice();
  }
  
  getIngredient(idx: number): Ingredient {
    return this._ingredients[idx];
  }

  ingExists(ingName: string): boolean {
    let returnVal: boolean;
    
    this._ingredients.forEach((ing: Ingredient) => {
      if (ing.name.toLowerCase() === ingName.toLowerCase()) returnVal = true;
      else returnVal = false;
    });
    
    return returnVal;
  }
  
  __clearIngredientsList(): void {
    this._ingredients.length = 0;
    this.ingredientsChanged.next(this._ingredients.slice());
    this.ingsLength.next(this._ingredients.length);
  }
}
