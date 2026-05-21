import { test, expect } from "@playwright/test";

// 1.1 FIXME
test("Status Code 200", async ({request}) => {
    const response = await request.get("https://automationexercise.com/api/productsList");

    const { responseCode, products } = await response.json();

    expect(responseCode).toBe(200);
    // i want to get all the categories that are returned by the endpoint
    const actualcategory = new Set(products.map((p: any) => p.category.category));

    //from the requirement document, we know that the expected categories are : `Tops`, `Tshirts`, `Dress`, `Tops & Shirts`, `Jeans`, `Saree`
    const expectedcategory = [`Tops`, `Tshirts`, `Dress`, `Tops & Shirts`, `Jeans`, `Saree`];
    for (const category of expectedcategory) {
        expect(actualcategory).toContain(category);
    }
})

// 1.2 FIXME
const endpoints = [
    "/api/productsList",
    "/api/brandsList",
    "/api/getUserDetailByEmail?email=test@test.com"
];

for (const endpoint of endpoints) {
    test(`GET ${endpoint} returns status code 200`, async ({ request }) => {
        const response = await request.get(`https://automationexercise.com${endpoint}`);
        const {responseCode} = await response.json();
        expect(responseCode).toBe(200);
    });
}