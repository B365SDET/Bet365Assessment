import { test, expect, APIResponse } from "@playwright/test";

interface Product {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: { usertype: { usertype: string }; category: string };
}

// The API always replies with HTTP 200 and reports the real status in the body as `responseCode`,
// so both are checked.
async function expectSuccess(response: APIResponse) {
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    return body;
}

// 1.1 FIXME
test("productsList returns the expected product categories", async ({ request }) => {
    const expectedCategories = ["Tops", "Tshirts", "Dress", "Tops & Shirts", "Jeans", "Saree"];

    const { products }: { products: Product[] } = await expectSuccess(await request.get("/api/productsList"));

    const categories = new Set(products.map(p => p.category.category));
    expect([...categories].sort()).toEqual([...expectedCategories].sort());
});

// 1.2 FIXME
test.describe("GET requests succeed", () => {
    const endpoints = [
        "/api/productsList",
        "/api/brandsList",
        "/api/getUserDetailByEmail?email=test@test.com",
    ];

    for (const endpoint of endpoints) {
        test(`GET ${endpoint} returns 200`, async ({ request }) => {
            await expectSuccess(await request.get(endpoint));
        });
    }
});

// Not part of the requirements: invalid requests should return the right error code
test.describe("Invalid requests return an error", () => {
    test("POST /api/productsList returns 405", async ({ request }) => {
        const body = await (await request.post("/api/productsList")).json();
        expect(body.responseCode).toBe(405);
    });

    test("GET /api/getUserDetailByEmail with an unknown email returns 404", async ({ request }) => {
        // A new email on every run, so no real account can have it
        const email = `no-such-user-${Date.now()}@example.com`;
        const body = await (await request.get(`/api/getUserDetailByEmail?email=${email}`)).json();
        expect(body.responseCode).toBe(404);
    });
});
