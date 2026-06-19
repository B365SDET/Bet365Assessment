import { test, expect } from "@playwright/test";

// 1.1 FIXME
test("Status Code 200", async ({request}) => {
    const response = await request.get("https://automationexercise.com/api/productsList");

    const { responseCode, products } = await response.json();

    expect(responseCode).toBe(200);
    expect(products.length).toEqual(34);
    for (let p of products) {
        const category = p.category;
        const expectedCategories = ['Tops', 'Tshirts', 'Dress', 'Tops & Shirts', 'Jeans', 'Saree'];
        const actualCategories = [...new Set(products.map((p) => p.category.category))].sort();
        expect(actualCategories).toEqual(expectedCategories.sort());
    }
})

// 1.2 FIXME
const API_BASE = 'https://automationexercise.com/api';
test.describe('API status checks', () => {
  test('productsList returns 200', async ({ request }) => {
    const response = await request.get(`${API_BASE}/productsList`);
    expect(response.status()).toBe(200);
    expect((await response.json()).responseCode).toBe(200);
  });
  test('brandsList returns 200', async ({ request }) => {
    const response = await request.get(`${API_BASE}/brandsList`);
    expect(response.status()).toBe(200);
    expect((await response.json()).responseCode).toBe(200);
  });
  test('getUserDetailByEmail returns 200', async ({ request }) => {
    const response = await request.get(`${API_BASE}/getUserDetailByEmail?email=test@test.com`);
    expect(response.status()).toBe(200);
    expect((await response.json()).responseCode).toBe(200);
  });
});
