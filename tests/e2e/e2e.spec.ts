import { test, expect } from '../fixtures';
import { CartPage } from '../pages/uiPages/cart.page';

// 1.3 FIXME
// Applied Page Object Model
// Added utils and fixtures to support the E2E tests

test.describe('AutomationExercise E2E', () => {
  test('Mens category has the expected clothing categories', async ({ home }) => {
    // Open the men's category and verify the expected clothing categories are present.
    await home.openMenCategory();

    const menCategories = await home.getMenCategoryNames();
    expect(menCategories).toEqual(['TSHIRTS', 'JEANS']);

    expect(await home.isMenCategoryVisible('TSHIRTS')).toBe(true);
    expect(await home.isMenCategoryVisible('JEANS')).toBe(true);
  });

  // 1.4 FIXME
  test('A user can successfully add an item to their cart', async ({ page, home }) => {
    // Add an item to the cart, and verify that the cart has at least one item.
    await home.addFirstProductToCartOnHome();

    const cart = new CartPage(page);
    await cart.open();

    const cartCount = await cart.getItemCount();
    expect(cartCount).toBeGreaterThan(0);
  });
});

