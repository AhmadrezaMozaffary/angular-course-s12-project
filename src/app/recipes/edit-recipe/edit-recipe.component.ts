import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  recipeName: string = '';
  editing = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const paramsName: string | undefined = params['recipeName'];

      if (paramsName) {
        this.recipeName = paramsName;
        this.editing = true;
      } else {
        this.editing = false;
      }
    });
  }
}
