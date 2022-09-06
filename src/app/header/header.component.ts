import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/Services/data-storage.service';
import { RecipeService } from '../shared/Services/recipe.service';
import { ShoppingListService } from '../shared/Services/shopping-list.service';
// import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() page: EventEmitter<string> = new EventEmitter();
  // constructor() {
  //   this.page.emit('recipes');
  // }
  // ngOnInit(): void {}
  // onSelect(page: string) {
  //   this.page.emit(page);
  // }
  numOfIngs: number;
  lenSubscription: Subscription;
  isSendingRequest: boolean = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private DS: DataStorageService
  ) {}

  ngOnInit(): void {
    this.lenSubscription = this.shoppingListService.ingsLength.subscribe(
      (ingLen) => {
        this.numOfIngs = ingLen;
      }
    );
  }

  onSaveData() {
    this.isSendingRequest = true;

    this.DS.setRecipes().subscribe(() => {
      this.isSendingRequest = false;
    });
  }

  onFetchData() {
    this.isSendingRequest = true;

    this.DS.getRecipes().subscribe((data) => {
      this.recipeService._dangerouslyOverwriteRecipes(data);

      this.isSendingRequest = false;
    });
  }

  ngOnDestroy(): void {
    this.lenSubscription.unsubscribe();
  }
}
