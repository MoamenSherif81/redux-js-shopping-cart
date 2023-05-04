import { removeProductHandler, store, updateProductHandler } from "./store.js";

const cartCont = document.querySelector('.cart');
const cartNum = document.querySelector('.cart-num');
const priceCont = document.querySelector('.total-price');

cartNum.innerHTML = store.getState().length;
renderCartItems();
store.subscribe(() => {
  cartNum.innerHTML = store.getState().length;
  renderCartItems()
})

function renderCartItems(){
  cartCont.innerHTML = '';
  let totalPrice = 0;
  store.getState().forEach(ele => {
    totalPrice += ele.price * ele.amount;
    let newProductObj = createNewProduct(ele);
    addEventListnersToProdBtns(newProductObj);
    cartCont.append(newProductObj);
  });
  priceCont.innerHTML = totalPrice;
}

function createNewProduct(prod){
  let newProductObj = document.createElement('div');
  newProductObj.className = 'cart-product';
  newProductObj.setAttribute('data-id', prod.id);
  newProductObj.innerHTML += `
    <img class='cart-product-img' src=${prod.images[0]} />
    <div class='cart-product-text'>
      <h5>${prod.title}</h5>
      <p>${prod.description}</p>
      <div class='cart-product-amount'>
        <button class='btn btn-primary change-amount change-amount-inc'>+</button>
        <span>${prod.amount}</span>
        <button class='btn btn-primary change-amount change-amount-dec'>-</button>
        <button class='btn btn-danger remove-product'>Remove</button>
      </div>
    </div>
  `
  return newProductObj;
}

function addEventListnersToProdBtns(newProductObj){
  let incBtn = newProductObj.querySelector('.change-amount-inc');
  let decBtn = newProductObj.querySelector('.change-amount-dec');
  let deleteBtn = newProductObj.querySelector('.remove-product');
  incBtn.addEventListener('click', (e) => {
    console.log('here');
    let id = e.target.closest('.cart-product').getAttribute('data-id');
    store.dispatch(updateProductHandler(id, 'inc'))
  })
  decBtn.addEventListener('click', (e) => {
    let id = e.target.closest('.cart-product').getAttribute('data-id');
    store.dispatch(updateProductHandler(id, 'dec'))
  })
  deleteBtn.addEventListener('click', (e) => {
    let id = e.target.closest('.cart-product').getAttribute('data-id');
    store.dispatch(removeProductHandler(id))
  })
}