import { APIRequestContext, APIResponse as PlaywrightAPIResponse, expect } from '@playwright/test';

export interface ProductCategory {
  category: string;
}

export interface Product {
  category: ProductCategory;
  [key: string]: any;
}

export interface ProductsListResponse {
  responseCode: number;
  products: Product[];
}

export interface BrandsListResponse {
  responseCode: number;
  brands: any[];
}

export interface UserDetailResponse {
  responseCode: number;
  user?: any;
}

export interface ApiResponse<T> {
  status: number;
  body: T;
}

export class AutomationExerciseApi {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl?: string) {
    this.request = request;
    this.baseUrl = baseUrl ?? process.env.AE_API_BASE_URL ?? 'https://automationexercise.com';
  }

  static assertResponseCode200<T extends { responseCode: number }>(response: T): T {
    expect(response.responseCode).toBe(200);
    return response;
  }

  async getProductsList(): Promise<ProductsListResponse> {
    return this.fetchJsonBody<ProductsListResponse>('/api/productsList');
  }

  async getBrandsList(): Promise<BrandsListResponse> {
    return this.fetchJsonBody<BrandsListResponse>('/api/brandsList');
  }

  async getUserDetailByEmail(email: string): Promise<UserDetailResponse> {
    return this.fetchJsonBody<UserDetailResponse>(`/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`);
  }

  private endpoint(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  private async fetchJsonBody<T>(path: string): Promise<T> {
    const url = this.endpoint(path);
    const response = await this.request.get(url);
    const result = await this.validateJsonResponse<T>(response);
    return result.body;
  }

  private async validateJsonResponse<T>(response: PlaywrightAPIResponse, expectedResponseCode = 200): Promise<ApiResponse<T>> {
    expect(response.ok(), `API request failed with status ${response.status()}`).toBeTruthy();
    const body = (await response.json()) as T & { responseCode?: number };
    expect(body).not.toBeNull();
    expect(body.responseCode, `Expected API response code ${expectedResponseCode}`).toBe(expectedResponseCode);

    return { status: response.status(), body: body as T };
  }
}
