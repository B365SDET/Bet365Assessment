import { test, expect } from "@playwright/test";

// 1.1 FIXME
test("Status Code 200", async ({request}) => {
    const response = await request.get("https://automationexercise.com/api/productsList");

    const { responseCode, products } = await response.json();

    expect(responseCode).toBe(200);
    expect(products.length).toBeGreaterThan(0);
   
    const requiredCategories = ["Tops", "Tshirts","Dress","Tops & Shirts","Jeans","Saree"].map(c => c.toLowerCase().trim());
   
    const returnedCategories = products.map(p => p.category.category.toLowerCase().trim());
    for (const rc of requiredCategories) {
        expect(returnedCategories).toContain(rc);
    }
})

// 1.2 FIXME
test("GET product list returns 200", async ({ request }) => {
    let response = await request.get("https://automationexercise.com/api/productsList");

    const responseCode = (await response.json()).responseCode;
    expect(responseCode).toBe(200);

})
test("GET brands list returns 200", async ({ request }) => {
    let response = await request.get("https://automationexercise.com/api/brandsList");
    const responseCode1 = (await response.json()).responseCode;
    expect(responseCode1).toEqual(200);
})

test("GET /getUserDetailByEmail returns expected response", async ({ request }) => {
    let response = await request.get("https://automationexercise.com/api/getUserDetailByEmail?email=test@test.com");
    const responseCode2 = (await response.json()).responseCode;
    expect(responseCode2).toEqual(200);
})