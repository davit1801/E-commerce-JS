const API = `https://dummyjson.com/products?limit=30`;
const shopContent = document.querySelector(".shop-content");
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
const popularItemsBox = document.querySelector(".popular-products");
const sliderBox = document.querySelector(".slider-box")

// Get Data From API
async function getData() {
    const url = `https://dummyjson.com/products?limit=30`;
    const res = await fetch(url);
    const data = await res.json();
    popolarProducts(data);
    bestProduct(popularItems);
    const addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        const button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}
getData();

// Selection Of Popular Products
let popularItems;
function popolarProducts(data) {
    popularItems = data.products.filter((item) => item.rating > 4.7);
}

function bestProduct(data) {
    data.forEach((el) => {
        const popularItem = document.createElement("div");
        popularItem.classList.add("popular-products-item");
        popularItem.innerHTML = `
    <div class="popular-item-img">
    <img src="${el.images[0]}" alt="">
    </div>
    <div class="rate-price">
    <div class="popular-item-rate">Rate: ${el.rating.toFixed(1)}</div>
    <span class="popular-item-price">${el.price}$</span>
    </div>
    <h3 class="popular-item-title">${el.title}</h3>
    <p class="popular-item-description">${el.description}</p>`;
    popularItemsBox.appendChild(popularItem);
    popularItem.addEventListener("click",() => {
        window.location.href = `description.html?id=${el.id}`
    })
    });
}


// Slider 
async function getDataForslider() {
    const url = `https://dummyjson.com/products?limit=45`;
    const res = await fetch(url);
    const data = await res.json();
    createSlides(data);
}

getDataForslider();

// Create Slides
function createSlides (data) {
    data.products.forEach(el => {
        const slide = document.createElement("div")
        slide.classList.add("slide");
        slide.innerHTML = `<img src="${el.images[0]}">`
        sliderBox.appendChild(slide);
    })
    $('.slider-box').slick({
        slidesToShow: 3,
        slidesToScroll: 45,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight:true,
        arrows:true,
        centerMode:true,
      });
}



