import { APIRequestContext } from "@playwright/test";

export type Product = {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: {
        usertype: { usertype: string };
        category: string;
    };
};

export class AutomationExerciseApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    getProductsList() {
        return this.request.get("/api/productsList");
    }

    getBrandsList() {
        return this.request.get("/api/brandsList");
    }

    getUserDetailByEmail(email: string) {
        return this.request.get("/api/getUserDetailByEmail", { params: { email } });
    }
}
