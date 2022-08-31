import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/Services/recipe.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  // @Output() selectedRecipe: EventEmitter<Recipe> = new EventEmitter();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  titleToRoutePath(title: string): string {
    return title.toLowerCase().split(' ').join('-');
  }

  // onNewRecipe() {
  //   this.recipeService._recipeSelected.emit(true)
  // }

  getRecipeData() {
    // this.selectedRecipe.emit(recipeData);
    // this.recipeService._recipeSelected.emit(recipeData);
    this.recipeService._recipeSelected.emit(true);
  }
}
