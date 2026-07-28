import { test, expect } from "@playwright/test";

// 1.1 FIXME

const PRODUCT_CATEGORIES = [
    "Tops",
    "Tshirts",
    "Dress",
    "Tops & Shirts",
    "Jeans",
    "Saree"
];

test("productsList endpoint returns all required categories", async ({request}) => {
    const response = await request.get("api/productsList");
    expect(response.status()).toBe(200);

    const { responseCode, products } = await response.json();

    expect(responseCode).toBe(200);
    expect(products.length).toBeGreaterThan(0);

    const returnCategories = products.map((product:any) => product.category.category);

    for (const expected of PRODUCT_CATEGORIES) {
        expect.soft(returnCategories).toContain(expected);
    }
});

// 1.2 FIXME
test("GET productsList request returns a 200 response code", async ({ request }) => {
    const response = await request.get("api/productsList");
    expect(response.status()).toBe(200);

    const { responseCode } = (await response.json());
    expect(responseCode).toBe(200);
});

test("GET brandsList request returns a 200 response code", async ({ request }) => {
    const response = await request.get("api/brandsList");
    expect(response.status()).toBe(200);

    const { responseCode } = (await response.json());
    expect(responseCode).toBe(200);
});

test("GET getUserDetailByEmail request with email=test@test.com returns a 200 response code", async ({ request }) => {
    const response = await request.get("api/getUserDetailByEmail?email=test@test.com");
    expect(response.status()).toBe(200);

    const { responseCode } = (await response.json());
    expect(responseCode).toBe(200);
});

test("GET getUserDetailByEmail request with an unregistered email returns a 404 responseCode", async ({ request }) => {
    const response = await request.get("api/getUserDetailByEmail?email=doesnotexist@nope.com");
    expect(response.status()).toBe(200);

    const { responseCode, message } = (await response.json());
    expect(responseCode).toBe(404);
    expect(message).toContain("Account not found");
});

test("GET getUserDetailByEmail request without an email returns a 400 responseCode", async ({ request }) => {
    const response = await request.get("api/getUserDetailByEmail");
    expect(response.status()).toBe(200);

    const { responseCode, message } = (await response.json());
    expect(responseCode).toBe(400);
    expect(message).toContain("email parameter is missing");
});