import { APIRequestContext } from '@playwright/test';
import { AutomationExerciseApi, ProductsListResponse, BrandsListResponse, UserDetailResponse } from './automationexercise-api';

export class AutomationExerciseService {
  readonly api: AutomationExerciseApi;

  constructor(request: APIRequestContext) {
    this.api = new AutomationExerciseApi(request);
  }

  async fetchProducts(): Promise<ProductsListResponse> {
    return this.api.getProductsList();
  }

  async fetchBrands(): Promise<BrandsListResponse> {
    return this.api.getBrandsList();
  }

  async fetchUserByEmail(email: string): Promise<UserDetailResponse> {
    return this.api.getUserDetailByEmail(email);
  }

  async productsByCategory(categoryName: string) {
    const body = await this.fetchProducts();
    return body.products.filter((p) => p?.category?.category === categoryName);
  }

  static assert200<T extends { responseCode: number }>(response: T) {
    return AutomationExerciseApi.assertResponseCode200(response);
  }
}
