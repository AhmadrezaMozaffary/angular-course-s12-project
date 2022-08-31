import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

import { RecipeService } from '../shared/Services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  detailsData: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService._recipeSelected.subscribe((recipe: Recipe) => {
      this.detailsData = recipe;
    });
  }
}
