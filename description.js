const id = new URLSearchParams(window.location.search).get("id");
const shopContent = document.querySelector(".shop-content");

async function GetProduct (id) {
    const url = `https://dummyjson.com/products/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createProduct(data);

}

function createProduct(product) {
        const productBox = document.createElement("div");
        productBox.classList.add("product-box");
        productBox.innerHTML = `
        <div class="img-container">
        <img src="${product.images[0]}" alt="" class="product-img" />
        </div>
        <h3 class="product-title">${product.title}</h3>
        <span class="product-price">${product.price}$</span>
        <i class="bx bx-shopping-bag add-cart"></i>`;
        shopContent.appendChild(productBox);
}

GetProduct(id);