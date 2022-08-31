import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

import { RecipeService } from '../shared/Services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  detailsData: Recipe;
  recipeIsSelected = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['recipeName']) this.recipeService._recipeSelected.emit(true);
      else this.recipeService._recipeSelected.emit(false);
    });
    this.recipeService._recipeSelected.subscribe((isSelected: boolean) => {
      this.recipeIsSelected = isSelected;
    });
  }
}
