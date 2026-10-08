import { test, expect } from "@playwright/test";

// 1.1 FIXME
test("productsList returns the expected product categories", async ({ request }) => {
    const expectedCategories = ["Tops", "Tshirts", "Dress", "Tops & Shirts", "Jeans", "Saree"];

    const response = await request.get("https://automationexercise.com/api/productsList");
    expect(response.status()).toBe(200);

    const { responseCode, products } = await response.json();
    expect(responseCode).toBe(200);

    const actualCategories = [...new Set(products.map((p: any) => p.category.category))];
    expect(actualCategories.sort()).toEqual([...expectedCategories].sort());
})

// 1.2 FIXME
const API_BASE_URL = "https://automationexercise.com/api";

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
