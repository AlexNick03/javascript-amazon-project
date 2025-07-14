import {products} from '../data/products.js'
import {cart} from '../data/cart.js';
import {totalQuantityCalc} from '../data/cart.js';

const productGridEl = document.querySelector('.products-grid')
let productHtml = ''
let itemPrice = 0
let totalQuantity = 0
let ratingImg =''
let resetCartBtn = document.querySelector('.reset-cart')
resetCartBtn.addEventListener('click', resetCart)
let cartTotalQuantity = document.querySelector('.cart-quantity')
cartTotalQuantity.innerHTML = totalQuantityCalc(totalQuantity)
products.forEach((value, index) =>{
    itemPrice = value.priceCents/100
    itemPrice = itemPrice.toFixed(2)
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


addButtonsEls.forEach((button, index)=>{
    let intervalId
     
    button.addEventListener('click',()=>{
      let addedProductName
      let addedProductPrice
      let addedQuantity
      let matchingProduct
      let matchingId = button.dataset.productId

      addedProductName = products[index].name
      addedProductPrice = (products[index].priceCents/100).toFixed(2)
      addedQuantity = choseQuantitySelectors[index].value

      cart.forEach((product)=>{
          if (product.productId===matchingId){
          matchingProduct = product
        }
        
      })
      if(matchingProduct){
        matchingProduct.quantity = Number(matchingProduct.quantity) + Number(addedQuantity)
        localStorage.setItem('cart',JSON.stringify(cart)) 
      }
      else{
          cart.push({
              productId: matchingId,
              productName: addedProductName,
              productPrice: addedProductPrice,
              quantity : addedQuantity})
          localStorage.setItem('cart',JSON.stringify(cart))    
         }
          
          
          cartTotalQuantity.innerHTML= totalQuantityCalc(totalQuantity)

      })
    
    

    button.addEventListener('click', ()=>{
      clearInterval(intervalId)  
      addConfirmationEls[index].style.opacity = 1  
      intervalId = setInterval(()=>{
          addConfirmationEls[index].style.opacity = 0
        },2000)
    
  })

})


function resetCart(){
  localStorage.removeItem('cart')
  totalQuantity = 0
  cartTotalQuantity.innerHTML = totalQuantity
}