import { PageObject } from "./PageObject";

export class ApiEndpoints {
    private static readonly API_BASE = `${PageObject.BASE_URL}/api`;

    static readonly PRODUCTS_LIST = `${ApiEndpoints.API_BASE}/productsList`;
    static readonly BRANDS_LIST = `${ApiEndpoints.API_BASE}/brandsList`;
    static readonly USER_DETAIL_BY_EMAIL = `${ApiEndpoints.API_BASE}/getUserDetailByEmail`;
}