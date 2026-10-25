import { test, expect } from '../fixtures';

// 1.3 FIXME
test('Mens category shows the expected clothing categories', async ({ homePage }) => {
  await homePage.goto();
  await homePage.expandCategory('Men');

  await expect(homePage.subCategories('Men').filter({ visible: true }))
    .toHaveText(['TShirts', 'Jeans'], { ignoreCase: true });
});

// 1.4 FIXME
test('A user can add a product to their cart', async ({ homePage, cartPage }) => {
  const product = { name: 'Blue Top', price: 'Rs. 500' };

  await cartPage.goto();
  await expect(cartPage.emptyCartMessage).toBeVisible();

  await homePage.goto();
  await homePage.addToCart(product.name);
  await expect(homePage.addedToCartMessage).toBeVisible();
  await homePage.viewCart();

  await expect(cartPage.items).toHaveCount(1);
  const item = cartPage.item(product.name);
  await expect(item.price).toHaveText(product.price);
  await expect(item.quantity).toHaveText('1');
  await expect(item.total).toHaveText(product.price);
});
