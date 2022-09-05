import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
  recipeImageSrc = '';

  private _regExToValidateURL =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

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
    let _rcpIngs = new FormArray([]);

    if (this.editing) {
      const __rcp = this.recipeService.getRecipeByName(this.recipeName);

      _rcpName = __rcp.name;
      _rcpImgPath = __rcp.imagePath;
      _rcpDesc = __rcp.description;
      this.recipeImageSrc = __rcp.imagePath || '';

      if (__rcp['ingredients']) {
        __rcp.ingredients.forEach((ing) => {
          _rcpIngs.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, Validators.required),
            })
          );
        });
      }
    }

    this.recipeEditForm = new FormGroup({
      name: new FormControl(_rcpName, Validators.required),
      imagePath: new FormControl(_rcpImgPath, [
        Validators.required,
        Validators.pattern(this._regExToValidateURL),
      ]),
      description: new FormControl(_rcpDesc, Validators.required),
      ings: _rcpIngs,
    });
  }

  getIngsControls(): FormArray[] {
    return <FormArray[]>this.recipeEditForm.get('ings')['controls'];
  }

  onAddNewIng(): void {
    (<FormArray>this.recipeEditForm.get('ings')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(1, Validators.required),
      })
    );
  }

  onClearForm(): void {
    if (confirm('All of data will be lost!')) {
      this.recipeEditForm.reset();
      // this.recipeEditForm.patchValue({
      //   controls: {
      //     ings: {
      //       controls: new FormArray([]),
      //     },
      //   },
      // });
    }
  }
}
