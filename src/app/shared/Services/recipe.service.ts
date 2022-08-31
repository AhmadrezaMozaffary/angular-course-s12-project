import { EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../ingredient.mode';

export class RecipeService {
  _recipeSelected = new EventEmitter<boolean>();
  _addNewRecipe = false

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

  getRecipeByName(recipeName: string): Recipe {
    return this.recipes.find(
      (recipe: Recipe) =>
        recipe.name.toLowerCase() == recipeName.split('-').join(' ')
    );
  }

  validRecipe(recipeName: string): boolean {
    return this.recipes.some((recipe: Recipe) => {
      return recipe.name.toLowerCase() == recipeName.split('-').join(' ');
    });
  }
}
