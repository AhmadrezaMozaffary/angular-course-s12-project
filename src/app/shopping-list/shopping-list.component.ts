import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.mode';
import { ShoppingListService } from '../shared/Services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  shoppingListIngsChangedSubscription: Subscription;

  listIsEmptySubscription: Subscription;
  showClearBtn: boolean;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.shoppingListIngsChangedSubscription =
      this.shoppingListService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
          this.shoppingListService.ingsLength.next(ingredients.length)
        }
      );

    this.listIsEmptySubscription =
      this.shoppingListService.ingsLength.subscribe((len: number) => {
        this.showClearBtn = len !== 0 ? true : false;
      });
  }

  onEdit(index: number): void {
    this.shoppingListService.startEditIngredient.next(index);
  }

  clearDangerously(): void {
    if (confirm('Are you sure?'))
      this.shoppingListService.__clearIngredientsList();
  }

  ngOnDestroy(): void {
    this.shoppingListIngsChangedSubscription.unsubscribe();
    this.listIsEmptySubscription.unsubscribe();
  }
}
