// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../ingredient.mode';

export class RecipeService {
  _recipeSelected = new Subject<boolean>();
  _recipesChanged = new Subject<Recipe[]>();
  // _addNewRecipe = false;

  private recipes: Recipe[] = [
    new Recipe(
      'A delicious food',
      'Iranian / Persian food ',
      'https://newsmedia.tasnimnews.com/Tasnim/Uploaded/Image/1400/09/07/1400090712354169924151294.jpg',
      [
        new Ingredient('Rice', 4),
        new Ingredient('Saffron', 1),
        new Ingredient('Meat', 2),
      ]
    ),
    new Recipe(
      'Steak beef',
      'Medium rare steak beef',
      'https://img.freepik.com/free-photo/juicy-steak-medium-rare-beef-with-spices-grilled-vegetables_2829-18672.jpg?w=1380&t=st=1661584012~exp=1661584612~hmac=08370b1836e327c86668631888b00d4341d025417907cea0f79cb207d9fedf7f',
      [new Ingredient('Meat', 1), new Ingredient('Onion', 1)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeByName(recipeName: string): Recipe | undefined {
    if (!this.validRecipe(recipeName)) return undefined;

    return this.recipes.find(
      (recipe: Recipe) =>
        recipe.name.toLowerCase() === recipeName?.split('-').join(' ')
    );
  }

  getRecipeIndex(rcpName: string): number {
    return this.recipes.findIndex(
      (rec) =>
        rec.name.toLowerCase() == rcpName.split('-').join(' ').toLowerCase()
    );
  }

  removeRecipe(recipeName: string): void {
    const idx = this.getRecipeIndex(recipeName);

    this.recipes.splice(idx, 1);

    this._recipesChanged.next(this.recipes.slice());
  }

  /**
   * @param rcp > A recipe object with type of Recipe
   * @param config > {
   * update > If you want to update existing one
   * updateTarget > If update property is equal to true
   * }
   */
  addRecipe(
    rcp: Recipe,
    config: { update: boolean; updateTargetName?: string } = { update: false }
  ): void {
    if (config.update) {
      const exRecipeIdx = this.getRecipeIndex(config.updateTargetName);
      this.recipes[exRecipeIdx] = rcp;

      this._recipesChanged.next(this.recipes.slice());
    } else {
      this.recipes.push(rcp);

      this._recipesChanged.next(this.recipes.slice());
    }
  }

  validRecipe(recipeName: string): boolean {
    return this.recipes.some(
      (recipe: Recipe) =>
        recipe?.name?.toLowerCase() == recipeName?.split('-').join(' ')
    );
  }
}
