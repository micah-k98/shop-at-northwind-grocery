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

    // Register Events
    selectSearchType.addEventListener("change", filterSearchType);

    // Call functions
    addProductList();
    addCategories();
    filterSearchType();
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

function filterSearchType() {
    if (selectSearchType.value == "productSearch") {
        selectProduct.hidden = false;
        selectCategory.hidden = true;
    }
    else if (selectSearchType.value == "categorySearch") {
        selectProduct.hidden = true;
        selectCategory.hidden = false;
    }
    else {
        selectProduct.hidden = true;
        selectCategory.hidden = true;
        viewAll();
    }
}

async function viewAll() {
    productsContainer.innerText = "";

    let products = await allDataService.productsData();
    let catergories = await allDataService.categoriesData();
    let productCategory;

    products.forEach(product => {
        
        catergories.forEach(category => {
            if (category.id == product.categoryId) productCategory = category.name;
        })

        displayProducts(product, productCategory);
    })
}

function displayProducts(product, productCategory) {
    let card = productContainerTemplate.content.cloneNode(true);

    card.getElementById("productName").innerText = product.productName;
    card.getElementById("productCategory").innerText = productCategory;
    card.getElementById("productPrice").innerText = product.unitPrice;
     
    productsContainer.appendChild(card);
}