import { test, expect } from "@playwright/test";

// 1.1 FIXME
test("productsList API contains required categories", async ({request}) => {
    const response = await request.get("https://automationexercise.com/api/productsList");
    const expectedCategories = ["Tops", "Tshirts", "Dress", "Tops & Shirts", "Jeans", "Saree"];

    const { responseCode, products } = await response.json();

    expect(responseCode).toEqual(200);
    expect(products.length).toEqual(34);

    const allCategories: string[] = products.map((product: { category: { category: any; }; }) => product.category.category);
    const containsAll = expectedCategories.every(val => allCategories.includes(val)); 

    expect(containsAll).toEqual(true);
})

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