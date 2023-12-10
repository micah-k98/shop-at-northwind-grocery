"use strict"

let selectSearchType, selectProduct, selectCategory;
let productsContainer, productContainerTemplate;
let categories, allDataService, filterDataService;

document.addEventListener("DOMContentLoaded", () => {

    allDataService = new AllDataService();
    filterDataService = new FilterDataService();

    // Set variables
    selectSearchType = document.getElementById("selectSearchType");
    selectProduct = document.getElementById("selectProduct");
    selectCategory = document.getElementById("selectCategory");
    productsContainer = document.getElementById("productsContainer");
    productContainerTemplate = document.getElementById("productContainerTemplate");

    // Register Events
    selectSearchType.addEventListener("change", filterSearchType);
    selectProduct.addEventListener("change", filterProduct);
    selectCategory.addEventListener("change", filterCategory);

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
    categories = await allDataService.categoriesData();

    categories.forEach(category => {
        let option = new Option(category.name, category.id);
        selectCategory.appendChild(option);
    });
}

function filterSearchType() {
    if (selectSearchType.value == "productSearch") {
        selectProduct.hidden = false;
        selectCategory.hidden = true;
        filterProduct();
    }
    else if (selectSearchType.value == "categorySearch") {
        selectProduct.hidden = true;
        selectCategory.hidden = false;
        filterCategory();
    }
    else {
        selectProduct.hidden = true;
        selectCategory.hidden = true;
        productsContainer.innerText = "";
        if (selectSearchType.value == "all") viewAll();
    }
}

async function filterProduct() {
    productsContainer.innerText = "";
    
    if (selectProduct.value != "0") {
        let selectedProductId = selectProduct.value;
        let product = await filterDataService.product(selectedProductId); 
        displayProducts(product);
    }
}

async function filterCategory() {
    productsContainer.innerText = "";
    
    if (selectCategory.value != "0") {
        let selectedCategoryId = selectCategory.value;
        let products = await filterDataService.category(selectedCategoryId); 
        
        products.forEach(product => {
            displayProducts(product);
        })
    }
}

async function viewAll() {
    productsContainer.innerText = "";

    let products = await allDataService.productsData();
    
    products.forEach(product => {
        displayProducts(product);
    })
}

function displayProducts(product) {
    let productCategory;

    categories.forEach(category => {
        if (category.id == product.categoryId) productCategory = category.name;
    })

    let card = productContainerTemplate.content.cloneNode(true);

    card.getElementById("productName").innerText = product.productName;
    card.getElementById("productCategory").innerText = productCategory;
    card.getElementById("productPrice").innerText = product.unitPrice;
     
    productsContainer.appendChild(card);
}