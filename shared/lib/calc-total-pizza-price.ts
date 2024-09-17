import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

/**
 * Function to calculate pizza's price
 * @param type type of selected pizza
 * @param size size of selected pizza
 * @param items list of pizza's variants
 * @param ingredients list of pizzas ingredients
 * @param selectedIngredients selected ingredients
 * @returns number - total price
 */

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

  const totalIngredientPrice = ingredients
    .filter((item) => selectedIngredients.has(item.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientPrice;
};
