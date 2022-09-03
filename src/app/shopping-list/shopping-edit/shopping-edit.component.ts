// import {
//   Component,
//   ElementRef,
//   EventEmitter,
//   Input,
//   OnInit,
//   Output,
//   ViewChild,
// } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.mode';
import { ShoppingListService } from 'src/app/shared/Services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

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
    const ing = new Ingredient(formValue.name, formValue.amount);
    this.shoppingListService.addIngredient(ing);
  }
}
