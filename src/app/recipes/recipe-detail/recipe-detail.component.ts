import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { Ingredient } from 'src/app/shared/ingredient.mode';
import { RecipeService } from 'src/app/shared/Services/recipe.service';
import { ShoppingListService } from 'src/app/shared/Services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input('recipeDetailData') recipeData: Recipe | undefined;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const findRecipe = this.recipeService.getRecipeByName(
        params['recipeName']
      );
      if (findRecipe !== undefined) {
        this.recipeData = findRecipe;
      } else {
        this.router.navigate(['/recipes', 'new']);

        this.recipeService._addNewRecipe = true;
        this.recipeService._recipeSelected.next(true);
      }
    });

    // this.recipeService._recipeSelected.subscribe((recipe: Recipe) => {
    //   this.recipeData = recipe;
    // });
  }

  onEdit() {
    this.recipeService._recipeSelected.next(true);

    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  addToShoppingList() {
    this.shoppingListService.addIngs(this.recipeData.ingredients);
  }
}
