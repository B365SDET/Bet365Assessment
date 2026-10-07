import { test, expect, APIResponse } from "@playwright/test";

const API_URL = "https://automationexercise.com/api";

// This API always returns HTTP 200 and puts the real status in the body as `responseCode`,
// so we check both. The original tests only looked at the body.
async function expectSuccess(response: APIResponse) {
    expect(response.status(), `HTTP status for ${response.url()}`).toBe(200);
    const body = await response.json();
    expect(body.responseCode, `responseCode for ${response.url()}`).toBe(200);
    return body;
}

// 1.1
// The old test asserted every product was in the "Saree" category, so it failed on the
// very first product ("Blue Top" -> "Tops"). The requirement is really that the list
// contains these six categories, so we collect the unique categories and compare.
// Also dropped the hard-coded `products.length === 34` - it isn't in the requirement and
// would break as soon as a product is added or removed.
test("productsList returns the expected product categories", async ({ request }) => {
    const response = await request.get(`${API_URL}/productsList`);
    const { products } = await expectSuccess(response);

    const categories: string[] = Array.from(new Set(products.map((p: any) => p.category.category)));

    // sort both sides so the order doesn't matter
    expect(categories.sort()).toEqual(
        ["Tops", "Tshirts", "Dress", "Tops & Shirts", "Jeans", "Saree"].sort()
    );
});

// 1.2
// Split this into one test per endpoint. Before, if productsList failed the other two
// never ran and the report didn't tell you which one broke. It also removes the
// copy/pasted responseCode1/responseCode2 blocks and the reused `let response`.
test.describe("GET endpoints return 200", () => {
    const endpoints = [
        { name: "productsList", path: "/productsList" },
        { name: "brandsList", path: "/brandsList" },
        // let Playwright build the query string instead of concatenating it into the URL
        { name: "getUserDetailByEmail", path: "/getUserDetailByEmail", params: { email: "test@test.com" } },
    ] satisfies { name: string; path: string; params?: Record<string, string> }[];

    for (const { name, path, params } of endpoints) {
        test(`${name} returns 200`, async ({ request }) => {
            const response = await request.get(`${API_URL}${path}`, { params });
            await expectSuccess(response);
        });
    }
});
