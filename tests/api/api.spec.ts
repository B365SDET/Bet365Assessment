import { test, expect } from "@playwright/test";

// Pseudo api contract
export const AllowedCategories = [
  "Tops",
  "Jeans",
  "Dress",
  "Saree",
  "Tshirts",
  "Tops & Shirts",
] as const;

export const AllowedUsertypes = ["Women", "Men", "Kids"] as const;

// Contract validator functions
function validateProductShape(p: any) {
  expect(typeof p.id).toBe("number");
  expect(typeof p.name).toBe("string");
  expect(typeof p.price).toBe("string");
  expect(typeof p.brand).toBe("string");

  expect(p.category).toBeDefined();
  expect(typeof p.category).toBe("object");

  expect(typeof p.category.category).toBe("string");
  expect(AllowedCategories).toContain(p.category.category as any);

  expect(p.category.usertype).toBeDefined();
  expect(typeof p.category.usertype).toBe("object");
  expect(typeof p.category.usertype.usertype).toBe("string");
  expect(AllowedUsertypes).toContain(p.category.usertype.usertype as any);
}

function validateUserShape(u: any) {
  expect(typeof u.id).toBe("number");
  expect(typeof u.name).toBe("string");
  expect(typeof u.email).toBe("string");
  expect(u.email).toContain("@"); 

  expect(typeof u.title).toBe("string");
  expect(typeof u.birth_day).toBe("string");
  expect(typeof u.birth_month).toBe("string");
  expect(typeof u.birth_year).toBe("string");
  expect(typeof u.first_name).toBe("string");
  expect(typeof u.last_name).toBe("string");
  expect(typeof u.company).toBe("string");
  expect(typeof u.address1).toBe("string");
  expect(typeof u.address2).toBe("string");
  expect(typeof u.country).toBe("string");
  expect(typeof u.state).toBe("string");
  expect(typeof u.city).toBe("string");
  expect(typeof u.zipcode).toBe("string");
}

// 1.1 – Contract test for /productsList
test("Products list contract is valid", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/productsList"
  );

  expect(response.status()).toBe(200);

  const contentType = response.headers()["content-type"] || "";

  // TEMP: API returns JSON but is labeled text/html; accept both for now.
  // TO DO: Validate expectation eith producer
  expect(contentType).toMatch(/application\/json|text\/html/);

  const json = await response.json();

  expect(json).toBeDefined();
  expect(typeof json).toBe("object");
  expect(typeof json.responseCode).toBe("number");
  expect(json.responseCode).toBe(200);

  expect(Array.isArray(json.products)).toBe(true);
  expect(json.products.length).toBeGreaterThan(0);

  const products = json.products as any[];

  const uniqueIds = new Set<number>();
  const uniqueCategories = new Set<string>();
  const uniqueUsertypes = new Set<string>();

  for (const p of products) {
    validateProductShape(p);
    uniqueIds.add(p.id);
    uniqueCategories.add(p.category.category);
    uniqueUsertypes.add(p.category.usertype.usertype);
  }

  expect(uniqueIds.size).toBe(products.length);
  expect(uniqueCategories.size).toBeGreaterThan(1);
  expect(uniqueUsertypes.size).toBeGreaterThan(1);

  const actualCategories = Array.from(uniqueCategories).sort();
  const expectedCategories = [...AllowedCategories].sort();
  expect(actualCategories).toEqual(expectedCategories);
});

// 1.2 – Contract test for /brandsList
test("Brands list returns 200", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/brandsList"
  );

  expect(response.status()).toBe(200);

  const contentType = response.headers()["content-type"] || "";
  expect(contentType).toMatch(/application\/json|text\/html/);

  const json = await response.json();

  expect(json).toBeDefined();
  expect(typeof json).toBe("object");
  expect(typeof json.responseCode).toBe("number");
  expect(json.responseCode).toBe(200);
});

// 1.2 – Contract test for /getUserDetailByEmail
test("User detail contract is valid for existing email", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/getUserDetailByEmail?email=test@test.com"
  );

  expect(response.status()).toBe(200);

  const contentType = response.headers()["content-type"] || "";

  // TEMP: API returns JSON but is labeled text/html; accept both for now.
  // TO DO: Validate expectation eith producer
  expect(contentType).toMatch(/application\/json|text\/html/);

  const json = await response.json();

  expect(json).toBeDefined();
  expect(typeof json).toBe("object");
  expect(typeof json.responseCode).toBe("number");
  expect(json.responseCode).toBe(200);

  expect(json.user).toBeDefined();
  expect(typeof json.user).toBe("object");

  const user = json.user;

  validateUserShape(user);

  expect(user.email).toBe("test@test.com");
  expect(user.name.length).toBeGreaterThan(0);
  expect(user.country.length).toBeGreaterThan(0);
  expect(user.city.length).toBeGreaterThan(0);
});
