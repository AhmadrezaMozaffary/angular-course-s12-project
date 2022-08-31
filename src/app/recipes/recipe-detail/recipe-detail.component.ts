import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.mode';
import { RecipeService } from 'src/app/shared/Services/recipe.service';
import { ShoppingListService } from 'src/app/shared/Services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input('recipeDetailData') recipeData: Recipe;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.recipeService._recipeSelected.subscribe((recipe: Recipe) => {
      this.recipeData = recipe;
    });
  }

  addToShoppingList() {
    this.shoppingListService.addIngs(this.recipeData.ingredients);
  }
}
