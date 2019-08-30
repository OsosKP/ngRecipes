import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RepositoryService } from '../services/repository.service';

@Injectable()
export class RecipeService extends RepositoryService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
/*
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A German treat',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/1600px-Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
        new Ingredient('Lemon', 1)
      ]),
    new Recipe(
      'Big Fat Burger',
      'The ultimate food',
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Big_Mac_hamburger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Lettuce', 1),
        new Ingredient('Sauce', 1),
        new Ingredient('Pickles', 4),
        new Ingredient('Meat', 1)
      ])
  ];
*/
  constructor (private shoppingListService: ShoppingListService) { super(); }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.save(this.recipes, this.recipesChanged);
  }

  getRecipes () {
    return this.recipes.slice();  // slice() to return a copy, not a reference to the original
  }

  getRecipe (index: number) {
    return this.recipes[index];
  }

  addToShoppingList (ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.save(this.recipes, this.recipesChanged);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.save(this.recipes, this.recipesChanged);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.save(this.recipes, this.recipesChanged);
  }
}