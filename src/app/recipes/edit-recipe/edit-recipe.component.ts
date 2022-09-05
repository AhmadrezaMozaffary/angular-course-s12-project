import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/Services/recipe.service';
import { Recipe } from '../recipe.model';

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

  private _regExToValidateURL =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
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

  onRemoveIng(idx: number): void {
    (<FormArray>this.recipeEditForm.get('ings')).removeAt(idx)
  }

  onSubmit(): void {
    const formValue = this.recipeEditForm.value;
    const rcp = new Recipe(
      formValue['name'],
      formValue['description'],
      formValue['imagePath'],
      formValue['ings']
    );

    this.recipeService.addRecipe(rcp, {
      update: this.editing,
      updateTargetName: this.recipeName,
    });
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }

  onCancelForm(): void {
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }

  onClearForm(): void {
    if (confirm('All of data will be lost!')) {
      this.recipeEditForm.reset();
    }
  }
}
