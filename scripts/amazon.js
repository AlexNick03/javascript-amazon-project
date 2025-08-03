import {products, loadProducts} from '../data/products.js'
import {cart, cartItmeDisplay} from '../data/cart.js';
import {totalQuantityCalc} from '../data/cart.js';
import { convretToDollars } from '../utils/price.js';
import { saveCartStorage } from '../data/cart.js';

loadProducts(renderProductGrid)
function renderProductGrid(){

const productGridEl = document.querySelector('.products-grid')
let productHtml = ''
let itemPrice = 0

let ratingImg =''

let cartTotalQuantity = document.querySelector('.cart-quantity')

cartTotalQuantity.innerHTML = cartItmeDisplay(totalQuantityCalc())

//Amazon Page Loader
products.forEach((value, index) =>{
    itemPrice = convretToDollars(value.priceCents)
    ratingImg = '../images/ratings/rating-'+value.rating.stars*10+'.png'
    productHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="`+value.image+`">
          </div>

          <div class="product-name limit-text-to-2-lines">
            `+value.name+`
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="`+ratingImg+`">
            <div class="product-rating-count link-primary">
            `+value.rating.count+`
            </div>
          </div>

          <div class="product-price">
          $`+itemPrice+`
          </div>

          <div class="product-quantity-container">
            <select class = 'quantity-selector'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${value.id}">
            Add to Cart
          </button>
        </div>`
   
})
productGridEl.innerHTML+= productHtml


let addConfirmationEls = document.querySelectorAll('.added-to-cart')
let addButtonsEls = document.querySelectorAll('.add-to-cart-button')
let choseQuantitySelectors = document.querySelectorAll('.quantity-selector')


//Add To Cart Function
function addToCart(button, index){
  let addedQuantity = choseQuantitySelectors[index].value
      let matchingProduct
      let matchingId = button.dataset.productId

      cart.forEach((product)=>{
          if (product.productId===matchingId){
          matchingProduct = product
        }
        
      })
      if(matchingProduct){
        matchingProduct.quantity = Number(matchingProduct.quantity) + Number(addedQuantity)
        saveCartStorage(cart)
      }
      else{
          cart.push({
              productId: matchingId,
              quantity : addedQuantity})
          saveCartStorage(cart)  
         }
          
          
          cartTotalQuantity.innerHTML= cartItmeDisplay(totalQuantityCalc())
          
          
         
      }


//Add Buttons Assigments     
addButtonsEls.forEach((button, index)=>{

    let intervalId  
    button.addEventListener('click',()=>{
      addToCart(button,index)
    })
    button.addEventListener('click', ()=>{
      clearInterval(intervalId)  
      addConfirmationEls[index].style.opacity = 1  
      intervalId = setInterval(()=>{
          addConfirmationEls[index].style.opacity = 0
        },2000)
    
  })

})

}
