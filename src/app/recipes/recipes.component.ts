import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

import { RecipeService } from '../shared/Services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit, OnDestroy {
  detailsData: Recipe;
  dontShowNotSelectedRecipe = false;
  recipeSelectedSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const recipeIsValid = this.recipeService.validRecipe(
        params['recipeName']
      );

      if (recipeIsValid) this.recipeService._recipeSelected.next(true);
      else {
        this.recipeService._recipeSelected.next(false);
      }
    });
    this.recipeSelectedSubscription =
      this.recipeService._recipeSelected.subscribe((isSelected: boolean) => {
        this.dontShowNotSelectedRecipe = isSelected;
      });
  }

  ngOnDestroy(): void {
    this.recipeSelectedSubscription.unsubscribe();
  }
}
