import { test, expect } from "@playwright/test";

const EXPECTED_CATEGORIES = ["Tops", "Tshirts", "Dress", "Tops & Shirts", "Jeans", "Saree"];

// 1.1 FIXME
test("GET productsList returns expected product categories", async ({ request }) => {
    const response = await request.get("/api/productsList");
    expect(response.ok()).toBe(true);

    const { responseCode, products } = await response.json();
    expect(responseCode).toBe(200);

    const categories = new Set(products.map((p: { category: { category: string } }) => p.category.category));
    expect(categories).toEqual(new Set(EXPECTED_CATEGORIES));
});

// 1.2 FIXME
const endpoints = [
    { name: "productsList", payloadKey: "products" },
    { name: "brandsList", payloadKey: "brands" },
    { name: "getUserDetailByEmail", params: { email: "test@test.com" }, payloadKey: "user" },
];
// test could be flaky if this user is changed

for (const { name, params, payloadKey } of endpoints) {
    test(`GET ${name} returns a 200 response code`, async ({ request }) => {
        const response = await request.get(`/api/${name}`, { params });
        expect(response.ok()).toBe(true);

        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(body).toHaveProperty(payloadKey);
    });
}
