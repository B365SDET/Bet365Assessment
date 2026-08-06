import { test, expect } from "@playwright/test";

// 1.1
// The productsList endpoint should return all of the expected product categories.
test("productsList returns the expected product categories", {
    annotation: { type: "requirement", description: "1.1" },
}, async ({ request }) => {
    const response = await request.get("/api/productsList");

    // Verify both the transport-level status and the API's own responseCode.
    // (automationexercise always returns HTTP 200 and reports the real code in the body.)
    expect(response.status()).toBe(200);

    const { responseCode, products } = await response.json();
    expect(responseCode).toBe(200);

    const expectedCategories = [
        "Tops",
        "Tshirts",
        "Dress",
        "Tops & Shirts",
        "Jeans",
        "Saree",
    ];

    const actualCategories = new Set(
        products.map((p: any) => p.category.category)
    );

    for (const category of expectedCategories) {
        expect(actualCategories).toContain(category);
    }
});

// 1.2
// Each of these GET endpoints should return a 200 responseCode. Data-driving the
// endpoints keeps each check isolated so a failure points at the exact endpoint.
const getEndpoints = [
    "/api/productsList",
    "/api/brandsList",
    "/api/getUserDetailByEmail?email=test@test.com",
];

for (const path of getEndpoints) {
    test(`GET ${path} returns a 200 responseCode`, {
        annotation: { type: "requirement", description: "1.2" },
    }, async ({ request }) => {
        const response = await request.get(path);

        expect(response.status()).toBe(200);
        expect((await response.json()).responseCode).toBe(200);
    });
}
