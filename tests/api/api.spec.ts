import { test, expect } from "@playwright/test";

// 1.1 FIXME
test("Status Code 200", async ({request}) => {
    const response = await request.get("https://automationexercise.com/api/productsList");

    const { responseCode, products } = await response.json();
 const expectedcategory = ["Dress", "Tops", "Saree",  "Tshirts", "Jeans", "Tops & Shirts"];
    expect(responseCode).toBe(200);
    expect(products.length).toEqual(34);
    for (let p of products) {
        const category = p.category;
        expect(expectedcategory).toContain(category.category);
    }
})

// 1.2 FIXME
test("Products List GET requests succeed", async ({ request }) => {
    let response = await request.get("https://automationexercise.com/api/productsList");

    const responseCode = (await response.json()).responseCode;
    expect(responseCode).toBe(200);
    expect((await response.json()).products.length).toEqual(34);
     expect(response.ok()).toBeTruthy();
})

test("Brands List GET requests succeed", async ({ request }) => {
    let response = await request.get("https://automationexercise.com/api/brandsList");

    const responseCode1 = (await response.json()).responseCode;
    expect(responseCode1).toEqual(200);
    expect(response.ok()).toBeTruthy();
    
})

test("UserDetail ByEmail GET requests succeed", async ({ request }) => {
    let response = await request.get("https://automationexercise.com/api/getUserDetailByEmail?email=test@test.com");

    const responseCode2 = (await response.json()).responseCode;
    expect(responseCode2).toEqual(200);
     expect(response.ok()).toBeTruthy();
})