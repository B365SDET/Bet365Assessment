import { test, expect } from "@playwright/test";
import { ApiEndpoints } from "../pageObjects/ApiEndpoints";

// 1.1
test("GET /productsList returns expected product categories", async ({ request }) => {
  const response = await request.get(ApiEndpoints.PRODUCTS_LIST);

  await expect(response).toBeOK();

  const EXPECTED_CATEGORIES = [
    "Tops",
    "Tshirts",
    "Dress",
    "Tops & Shirts",
    "Jeans",
    "Saree",
  ];

  const { responseCode, products } = await response.json();

  expect(responseCode).toBe(200);

  const categories = [...new Set(products.map(product => product.category.category))];
  
  expect(categories).toEqual(
    expect.arrayContaining(EXPECTED_CATEGORIES),
  );
});

// 1.2
test.describe("GET endpoints return 200 response code", () => {
  const endpointCases = [
    {
      name: "productsList",
      endpoint: ApiEndpoints.PRODUCTS_LIST,
    },
    {
      name: "brandsList",
      endpoint: ApiEndpoints.BRANDS_LIST,
    },
    {
      name: "user detail by email",
      endpoint: `${ApiEndpoints.USER_DETAIL_BY_EMAIL}?email=test@test.com`,
    },
  ];

  for (const { name, endpoint } of endpointCases) {
    test(`GET ${name} returns responseCode 200`, async ({ request }) => {
      const response = await request.get(endpoint);
      await expect(response).toBeOK();

      const { responseCode } = await response.json();
      expect(responseCode).toBe(200);
    });
  }
});
