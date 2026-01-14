import { test, expect } from "@playwright/test";

// 1.1 FIXME
test("Testing product categories", async ({request}) => {
  const expectedCategories = ["Tops", "Tshirts", "Dress", "Tops & Shirts", "Jeans", "Saree"];
  const response = await request.get("https://automationexercise.com/api/productsList");

  const { responseCode, products } = await response.json();

  expect(responseCode).toBe(200);
  expect(products.length).toEqual(34);

  for (const p of products) {
    expect(expectedCategories).toContain(p.category.category);
  }
})

// 1.2 FIXME
const BASE_URL = "https://automationexercise.com/api";

const getEndpoints = [
  { name: "productsList", url: `${BASE_URL}/productsList` },
  { name: "brandsList", url: `${BASE_URL}/brandsList` },
  { name: "getUserDetailByEmail", url: `${BASE_URL}/getUserDetailByEmail?email=test@test.com` },
];

test.describe("Testing GET Requests", () => {
  for (const endpoint of getEndpoints) {
    test(`${endpoint.name} endpoint returns 200`, async ({ request }) => {
      const response = await request.get(endpoint.url);
      const { responseCode } = await response.json();

      expect(responseCode, `${endpoint.name} should return 200`).toBe(200);
    });
  }
});