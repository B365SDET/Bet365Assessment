import { test, expect } from "@playwright/test";

// 1.1 FIXME
test("Status Code 200", async ({request}) => {
    const response = await request.get("https://automationexercise.com/api/productsList");

    const { responseCode, products } = await response.json();
    expect(responseCode).toBe(200);
    expect(products.length).toEqual(34);
})

// 1.2 FIXME
test("GET requests succeed", async ({ request }) => {
    const baseUrl = "https://automationexercise.com/api/";
    const endpoints = ["productsList", "brandsList", "getUserDetailByEmail?email=test@test.com"];
    for (const endpoint of endpoints) {
        let response = await request.get(`${baseUrl}/${endpoint}`);
        const responseCode = (await response.json()).responseCode;
        expect(responseCode).toBe(200);
    }
})