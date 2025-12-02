import { APIRequestContext, request } from '@playwright/test';

export class ApiClient {
    private requestContext: APIRequestContext;

    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    async getProductList() {
        return this.requestContext.get('api/productsList');
    }

    async getBrandsList() {
        return this.requestContext.get('api/brandsList');
    }

    async getUserDetailByEmail(email: string) {
        return this.requestContext.get(`api/getUserDetailByEmail?email=${email}`);
    }

}