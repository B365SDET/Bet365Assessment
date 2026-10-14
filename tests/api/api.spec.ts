import { test, expect } from "@playwright/test";

type Product = {
    category: { category: string };
};

// 1.1 
test("productsList returns the expected product categories", async ({ request }) => {
    const expectedCategories = ["Tops", "Tshirts", "Dress", "Tops & Shirts", "Jeans", "Saree"];

    const response = await request.get("/api/productsList");
    expect(response.status()).toBe(200);

    const { responseCode, products } = await response.json();
    expect(responseCode).toBe(200);

    const categories = products.map((p: Product) => p.category.category);
    expect(categories).toEqual(expect.arrayContaining(expectedCategories));
});

// 1.2 
const endpoints = [
    { name: "productsList", path: "/api/productsList" },
    { name: "brandsList", path: "/api/brandsList" },
    { name: "getUserDetailByEmail", path: "/api/getUserDetailByEmail", params: { email: "test@test.com" } },
];

test.describe("GET endpoints return a 200 response code", () => {
    for (const { name, path, params } of endpoints) {
        test(`GET /${name} returns 200`, async ({ request }) => {
            const response = await request.get(path, { params });
            expect(response.status()).toBe(200);

            const { responseCode } = await response.json();
            expect(responseCode).toBe(200);
        });
    }
});
