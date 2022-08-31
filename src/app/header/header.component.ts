import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() page: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.page.emit('recipes');
  }

  ngOnInit(): void {}

  onSelect(page: string) {
    this.page.emit(page);
  }
}
