"use strict"

let allDataService, filterDataService;
let productDetails, productDetailsTemplate;

document.addEventListener("DOMContentLoaded", () => {
    
    allDataService = new AllDataService();
    filterDataService = new FilterDataService();

    // Set variables
    productDetailsTemplate = document.getElementById("productDetailsTemplate");
    productDetails = document.getElementById("productDetails");

    displayDetails();
})

async function displayDetails() {
    
    const urlParams = new URLSearchParams(location.search);
    let id = -1;
    if (urlParams.has("id") == true) {
        id = urlParams.get("id");

        let product = await filterDataService.product(id)
    
        let categories = await allDataService.categoriesData();
        let productCategory;
        categories.forEach(category => {
            if (category.id == product.categoryId) productCategory = category.name;
        })
        
        productDetails.innerText = "";
        let card = productDetailsTemplate.content.cloneNode(true);
        
        card.getElementById("productName").innerText = product.productName;
        card.getElementById("productCategory").innerText = productCategory;
        card.getElementById("productPrice").innerText = product.unitPrice;
        card.getElementById("productQty").innerText = product.unitsInStock;
        card.getElementById("productSupplier").innerText = product.supplier;

        productDetails.appendChild(card);
    }
    else location.href = "/products.html";
    
}