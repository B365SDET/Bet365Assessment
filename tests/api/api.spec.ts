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
test("GET requests succeed", async ({ request }) => {
    let response = await request.get("https://automationexercise.com/api/productsList");

    const responseCode = (await response.json()).responseCode;
    expect(responseCode).toBe(200);

    response = await request.get("https://automationexercise.com/api/brandsList");

    const responseCode1 = (await response.json()).responseCode;
    expect(responseCode1).toEqual(200);

    response = await request.get("https://automationexercise.com/api/getUserDetailByEmail?email=test@test.com");

    const responseCode2 = (await response.json()).responseCode;
    expect(responseCode2).toEqual(200);
})