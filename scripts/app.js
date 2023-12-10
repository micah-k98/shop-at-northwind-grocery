"use strict"

let selectSearchType, selectProduct, selectCategory;
let productsContainer, productContainerTemplate;
let allDataService;

document.addEventListener("DOMContentLoaded", () => {

    allDataService = new AllDataService();

    // Set variables
    selectSearchType = document.getElementById("selectSearchType");
    selectProduct = document.getElementById("selectProduct");
    selectCategory = document.getElementById("selectCategory");
    productsContainer = document.getElementById("productsContainer");
    productContainerTemplate = document.getElementById("productContainerTemplate");

    // Call functions
    addProductList();
    addCategories();
})

async function addProductList() {
    let products = await allDataService.productsData();

    products.forEach(product => {
        let option = new Option(product.productName, product.id);
        selectProduct.appendChild(option);
    });
}

async function addCategories() {
    let categories = await allDataService.categoriesData();

    categories.forEach(category => {
        let option = new Option(category.name, category.id);
        selectCategory.appendChild(option);
    });
}