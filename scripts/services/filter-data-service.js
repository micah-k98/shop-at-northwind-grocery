class FilterDataService {
    
    baseUrl = "http://localhost:3000/";

    async product(selectedProductId) {
        let response = await fetch(`${this.baseUrl}products/${selectedProductId}`);
        let body = await response.json();

        return body;
    }
}