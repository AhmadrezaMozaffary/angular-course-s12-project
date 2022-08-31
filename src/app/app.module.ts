import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shared/Services/shopping-list.service';
import { NotSelectedRecipeComponent } from './recipes/not-selected-recipe/not-selected-recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: 'new', component: EditRecipeComponent },
      { path: ':recipeName', component: RecipeDetailComponent },
      { path: ':recipeName/edit', component: EditRecipeComponent },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', redirectTo: 'recipes' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    NotSelectedRecipeComponent,
    EditRecipeComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [ShoppingListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
