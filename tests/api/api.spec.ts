import { test, expect } from '@playwright/test';

const apiBaseUrl = 'https://automationexercise.com/api';

test('productsList returns the expected product categories', async ({ request }) => {
  const response = await request.get(`${apiBaseUrl}/productsList`);

  expect(response.status()).toBe(200);

  const { responseCode, products } = await response.json();
  const actualCategories = [
    ...new Set<string>(products.map((product: { category: { category: string } }) => product.category.category)),
  ].sort();
  const expectedCategories = ['Tops', 'Tshirts', 'Dress', 'Tops & Shirts', 'Jeans', 'Saree'].sort();

  expect(responseCode).toBe(200);
  expect(actualCategories).toEqual(expectedCategories);
});

const successfulGetRequests = [
  { name: 'productsList', path: '/productsList' },
  { name: 'brandsList', path: '/brandsList' },
  { name: 'getUserDetailByEmail', path: '/getUserDetailByEmail?email=test@test.com' },
];

for (const { name, path } of successfulGetRequests) {
  test(`${name} returns a 200 response`, async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}${path}`);

    expect(response.status()).toBe(200);
    expect((await response.json()).responseCode).toBe(200);
  });
}
