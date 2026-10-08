import { test, expect } from "@playwright/test";

const API_BASE_URL = "https://automationexercise.com/api";

// Note: this API reports some errors as HTTP 200 with the real code in the body's `responseCode`
// (e.g. POST/PUT/DELETE on productsList return 200 + responseCode 405), so each test checks both,
// HTTP status first. The original tests only checked the body.

// 1.1
// Root cause: the original loop asserted every product's category was "Saree", so it failed on the
// first product (Blue Top = "Tops"). The requirement is about which categories appear in the list,
// so this compares the unique set of categories, ignoring order.
// The hardcoded `products.length === 34` was dropped: it isn't in the requirement and breaks
// whenever the catalog changes.
test("productsList returns the expected product categories", async ({ request }) => {
    const expectedCategories = ["Tops", "Tshirts", "Dress", "Tops & Shirts", "Jeans", "Saree"];

    const response = await request.get(`${API_BASE_URL}/productsList`);
    expect(response.status()).toBe(200);

    const { responseCode, products } = await response.json();
    expect(responseCode).toBe(200);

    const actualCategories = [...new Set(products.map((p: any) => p.category.category))];
    expect(actualCategories.sort()).toEqual([...expectedCategories].sort());
})

// 1.2
// The original checked all three endpoints in one test, so the first failure hid the others and the
// report didn't name the broken endpoint. Now each endpoint is its own test, generated from one table
// (replacing the copy-pasted blocks, the reused `let response`, and numbered variables). Playwright's
// `params` option builds the query string instead of hand-concatenating it.
const endpoints = [
    { name: "productsList", path: "/productsList" },
    { name: "brandsList", path: "/brandsList" },
    { name: "getUserDetailByEmail", path: "/getUserDetailByEmail", params: { email: "test@test.com" } },
];

test.describe("GET endpoints return a 200 response code", () => {
    for (const { name, path, params } of endpoints) {
        test(`GET /${name} returns 200`, async ({ request }) => {
            const response = await request.get(`${API_BASE_URL}${path}`, { params });
            expect(response.status()).toBe(200);

            const { responseCode } = await response.json();
            expect(responseCode).toBe(200);
        });
    }
});
