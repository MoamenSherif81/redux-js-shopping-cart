import { getAllProducts } from "./services/api.js";
import { addProductHandler, store } from "./store.js";

const productsCont = document.querySelector('.products-cont')
const cartNum = document.querySelector('.cart-num');
let productsData = [];

async function getProducts(){
  productsData = (await getAllProducts()).products;
  let content = '';
  productsData.forEach((product) => {
    content += `
      <div class='product col-12 col-md-4 col-lg-3' data-id="${product.id}">
        <div class="card">
          <img src=${product.images[0]} class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
          </div>
          <div class="card-footer product-footer">
            <p class='card-price m-0'>$${product.price}</p>
            <button href="#" class="btn btn-primary add-to-cart">Add to cart</button>
          </div>
        </div>
      </div>  
    `
  })
  productsCont.innerHTML = content;
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  addToCartBtns.forEach((ele) => {
    console.log('Here');
    ele.addEventListener('click', (e) => {
      addToCartHandler(e.target.closest('.product').getAttribute('data-id'));
    });
  })
}
getProducts();

function addToCartHandler(id){
  let product = productsData.filter(prod => prod.id == id);
  store.dispatch(addProductHandler({
    ...product[0],
    amount: 1
  }))
}

cartNum.innerHTML = store.getState().length;
store.subscribe(() => {
  cartNum.innerHTML = store.getState().length;
})