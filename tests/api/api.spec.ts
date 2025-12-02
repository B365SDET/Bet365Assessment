import { test, expect } from "@playwright/test";
import { ApiClient } from "../client/ApiClient";

let apiClient: ApiClient;

test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
});

test("Product list endpoint returns categories successfully", async ({request}) => {
    const expectedCategories = ["Tops", "Tshirts", "Dress", "Tops & Shirts", "Jeans", "Saree"];
    const response = await apiClient.getProductList();

    const { responseCode, products } = await response.json();

    expect(responseCode).toBe(200);
    expect(products.length).toEqual(34);

    //Retreive all product categories from the products list.
    //Validate that categories are not null or empty strings.
    const categories = products.map((p: any) => {
        expect(p.category).not.toBeNull();
        expect(p.category.category).not.toBeNull();
        expect(p.category.category).toBeTruthy(); 
        return p.category.category;
    });
    const actualCategories = Array.from(new Set(categories));
    // Validate that all expected categories are present in the actual categories
    expect(actualCategories.sort()).toEqual(expectedCategories.sort());
})


test("Automation Exercise API Health check", async ({ request }) => {
    expect((await apiClient.getProductList()).status(), 'Health check failed for getProductList endpoint').toBe(200);
    expect((await apiClient.getBrandsList()).status(), 'Health check failed for getBrandsList endpoint').toBe(200);
    expect((await apiClient.getUserDetailByEmail("test@test.com")).status(), 'Health check failed for getUserDetailByEmail').toBe(200) ;
})