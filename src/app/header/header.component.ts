import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  numOfIngs: string;
  lenSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.lenSubscription = this.shoppingListService.ingsLength.subscribe(
      (ingLen) => {
        this.numOfIngs = `(${ingLen})`;
      }
    );
  }

  ngOnDestroy(): void {
    this.lenSubscription.unsubscribe();
  }
}
