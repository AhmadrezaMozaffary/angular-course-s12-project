// import {
//   Component,
//   ElementRef,
//   EventEmitter,
//   Input,
//   OnInit,
//   Output,
//   ViewChild,
// } from '@angular/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.mode';
import { ShoppingListService } from 'src/app/shared/Services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  @ViewChild('f') slForm: NgForm;

  startEditIngSubscription: Subscription;
  editingMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.startEditIngSubscription =
      this.shoppingListService.startEditIngredient.subscribe(
        (index: number) => {
          this.editingMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        }
      );
  }

  addIngredient(form: NgForm) {
    // e.preventDefault();
    // if (
    //   this.nameInputRef.nativeElement.value !== '' &&
    //   +this.amountInputRef.nativeElement.value !== 0
    // ) {
    //   const ing = new Ingredient(
    //     this.nameInputRef.nativeElement.value,
    //     +this.amountInputRef.nativeElement.value
    //   );
    // }
    const formValue = form.value;

    // if (this.shoppingListService.ingExists(formValue.name)) {
    //   this.shoppingListService.getIngredient(this.editedItemIndex).amount +=
    //     +formValue.amount;
    // } else {
    //   const ing = new Ingredient(formValue.name, formValue.amount);
    //   this.shoppingListService.addIngredient(ing);
    // }

    const newIng = new Ingredient(formValue.name, formValue.amount);

    if (this.editingMode) {
      this.shoppingListService.editIng(this.editedItemIndex, newIng);
    } else {
      this.shoppingListService.addIngredient(newIng);
    }

    form.resetForm();
    this.editingMode = false;
  }

  onClear(): void {
    this.slForm.resetForm();
    this.editingMode = false;
  }

  ngOnDestroy(): void {
    this.startEditIngSubscription.unsubscribe();
  }
}
