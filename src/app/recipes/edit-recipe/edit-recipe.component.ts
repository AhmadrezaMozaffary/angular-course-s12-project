import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/shared/Services/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  recipeName: string; // Works like an ID
  showNew = false;
  editing = false;
  recipeEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const paramsName: string | undefined = params['recipeName'];
      const paramsNameIsValid =
        paramsName && this.recipeService.validRecipe(paramsName);

      if (typeof paramsName == undefined) {
        this.editing = false;
      }

      if (paramsNameIsValid) {
        this.recipeName = paramsName;
        this.editing = true;
      }

      this.showNew = this.recipeService._addNewRecipe;

      this.initForm();
    });
  }

  private initForm(): void {
    let _rcpName = '';
    let _rcpImgPath = '';
    let _rcpDesc = '';
    let _rcpIngs = '';

    if (this.editing) {
      const __rcp = this.recipeService.getRecipeByName(this.recipeName);

      _rcpName = __rcp.name;
      _rcpImgPath = __rcp.imagePath;
      _rcpDesc = __rcp.description;
    }

    this.recipeEditForm = new FormGroup({
      name: new FormGroup(_rcpName),
      imagePath: new FormGroup(_rcpImgPath),
      description: new FormGroup(_rcpDesc),
    });
  }
}
