class AllDataService {
    
    baseUrl = "http://localhost:3000/";

    async productsData() {
        let response = await fetch(this.baseUrl + "products");
        let body = await response.json();

        return body;
    }

    async categoriesData() {
        let response = await fetch(this.baseUrl + "categories");
        let body = await response.json();

        return body;
    }
}