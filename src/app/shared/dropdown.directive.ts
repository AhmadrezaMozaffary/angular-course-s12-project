import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;


  constructor(private el: ElementRef) {
  }

  @HostListener('click') toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
