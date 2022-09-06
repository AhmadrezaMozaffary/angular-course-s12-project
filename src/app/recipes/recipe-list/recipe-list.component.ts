import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/Services/data-storage.service';
import { RecipeService } from 'src/app/shared/Services/recipe.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];

  recipesChangedSubscription: Subscription;
  // @Output() selectedRecipe: EventEmitter<Recipe> = new EventEmitter();

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    // private DS: DataStorageService
  ) {}

  ngOnInit(): void {
    // this.DS.getRecipes().subscribe(
    //   (fetchedRecipe) => (this.recipes = fetchedRecipe)
    // );

    this.route.params.subscribe((params: Params) => {
      this.recipes = this.recipeService.getRecipes();
    });

    this.recipesChangedSubscription =
      this.recipeService._recipesChanged.subscribe((recipe: Recipe[]) => {
        this.recipes = recipe;
      });
  }

  titleToRoutePath(title: string): string {
    return title.toLowerCase().split(' ').join('-'); // e.g Recipe TitLE => recipe-title
  }

  onNewRecipe() {
    // this.recipeService._addNewRecipe = true;
    this.getRecipeData();
  }

  getRecipeData() {
    // this.selectedRecipe.emit(recipeData);
    // this.recipeService._recipeSelected.emit(recipeData);
    this.recipeService._recipeSelected.next(true);
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe();
  }
}
