import { APIResponse } from "@playwright/test";
import { test, expect } from "../fixtures";
import { AutomationExerciseApi, Product } from "../apiClients/AutomationExerciseApi";

// 1.1 FIXME
test("productsList returns the expected product categories", async ({ api }) => {
    const expectedCategories = ["Tops", "Tshirts", "Dress", "Tops & Shirts", "Jeans", "Saree"];

    const response = await api.getProductsList();
    await expect(response).toBeOK();

    const { products }: { products: Product[] } = await response.json();
    const categories = products.map(product => product.category.category);

    expect(categories).toEqual(expect.arrayContaining(expectedCategories));
});

// 1.2 FIXME
test.describe("GET endpoints return a 200 response code", () => {
    const endpoints: { name: string; call: (api: AutomationExerciseApi) => Promise<APIResponse> }[] = [
        { name: "productsList", call: api => api.getProductsList() },
        { name: "brandsList", call: api => api.getBrandsList() },
        { name: "getUserDetailByEmail", call: api => api.getUserDetailByEmail("test@test.com") },
    ];

    for (const { name, call } of endpoints) {
        test(name, async ({ api }) => {
            const response = await call(api);

            // The API always answers HTTP 200; the real status is the body's responseCode.
            await expect(response).toBeOK();
            expect(await response.json()).toMatchObject({ responseCode: 200 });
        });
    }
});
