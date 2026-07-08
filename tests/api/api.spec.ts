import { test, expect } from "@playwright/test";
import { AutomationExerciseService } from '../pages/apiPages/automationexercise-service';

// 1.1 FIXME
test.describe('AutomationExercise API', () => {
  test('Products API returns valid data', async ({ request }) => {
    const service = new AutomationExerciseService(request);
    const body = await service.fetchProducts();

    // Assert that the 'products' property in the response body is an array.
   // This verifies the basic structure of the returned data.
    expect(Array.isArray(body.products)).toBe(true);
    // Assert that the 'products' array contains at least one product.
    expect(body.products.length).toBeGreaterThan(0);

    const expectedCategories = [
      'Tops', 
      'Tshirts', 
      'Dress', 
      'Tops & Shirts',
       'Jeans', 
       'Saree'];
       
    const actualCategories = [...new Set(body.products.map((p) => p?.category?.category))];
    // Assert that the actual categories from the products match the expected categories.
    expect(actualCategories.sort()).toEqual(expectedCategories.sort()); 

    // Filter the 'products' array to find all products where the category name is 'Saree'.
    const sarees = body.products.filter((p) => p.category.category === 'Saree');
    expect(sarees.length).toBeGreaterThan(0);
  });

  // 1.2 FIXME 
  // Validate GET endpoints using the service
  test('All GET endpoints return successful responses', async ({ request }) => {
    const service = new AutomationExerciseService(request);
    AutomationExerciseService.assert200(await service.fetchProducts());
    AutomationExerciseService.assert200(await service.fetchBrands());
    AutomationExerciseService.assert200(await service.fetchUserByEmail('test@test.com'));
  });
});