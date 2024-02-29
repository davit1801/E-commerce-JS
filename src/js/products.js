const shopContent = document.querySelector(".shop-content");
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

// Get Data From API
async function getData() {
    const url = `https://dummyjson.com/products?limit=30`;
    const res = await fetch(url);
    const data = await res.json();
    createProduct(data);
    const addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        const button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

// Create Products List
function createProduct(product) {
    product.products.forEach((item) => {
        const productBox = document.createElement("div");
        productBox.classList.add("product-box");
        productBox.innerHTML = `
        <div class="img-container">
        <img src="${item.images[0]}" alt="" class="product-img" />
        </div>
        <h3 class="product-title">${item.title}</h3>
        <div class="price-cart">
        <span class="product-price">${item.price}$</span>
        <i class="bx bx-shopping-bag add-cart"></i>
        </div>`;
        shopContent.appendChild(productBox);
        productBox.addEventListener("click",() => {
            window.location.href = `description.html?id=${item.id}`
        })
    });
}

getData();

// Open Cart

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

// Close cart
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Remove Items From Cart
function removeCartItem() {
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

const removeCartButtons = document.querySelectorAll(".cart-remove");
removeCartButtons.forEach((el) => {
    el.addEventListener("click", removeCartItem);
});

//Quantity Changes
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

let quantityInputs = document.querySelectorAll(".cart-quantity");
quantityInputs.forEach((el) => {
    el.addEventListener("change", quantityChanged);
});

// Update Total
function updateTotal() {
    const cartContent = document.getElementsByClassName("cart-content")[0];
    const cartBoxes = document.getElementsByClassName("cart-box");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        const cartBox = cartBoxes[i];
        const priceElement = cartBox.getElementsByClassName("cart-price")[0];
        const quantityElement =
            cartBox.getElementsByClassName("cart-quantity")[0];
        const price = parseFloat(priceElement.innerText.replace("$", ""));
        const quantity = quantityElement.value;
        total = total + price * quantity;
}
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// Add To Cart
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title =
        shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price =
        shopProducts.getElementsByClassName("product-price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;

    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    const cartItems = document.getElementsByClassName("cart-content")[0];
    const cartItemsNames =
        cartItems.getElementsByClassName("cart-product-title");
    // for (let i = 0; i < cartItemsNames.length; i++) {
    //     alert("You have already add this item to cart");
    // }

    const cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bxs-trash-alt cart-remove' ></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}

// Buy Button Work
function buyButtonClicked() {
    alert("Your Order is Placed");
    const cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);