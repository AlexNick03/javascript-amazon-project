import {products} from '../../data/products.js'
import {cart, totalQuantityCalc, saveCartStorage } from '../../data/cart.js';
import {convretToDollars} from '../../utils/price.js'
import {deliveryOptions, updateDeliveryOption, deliveryOptionDays} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';


//Render Order Summary Function
export function renderOrderSummary(){



  let showProductsEl = document.querySelector('.order-summary')
  let cartProdHtml = ''
  let currentProd 
  const totalItemCheck = document.querySelector('.return-to-home-link')
  totalItemCheck.innerHTML = totalQuantityCalc() + ' items'



  //Delivery Options Html

  function addDeliveryOptions(product){
    
    let delOptionHtml=''
    let delPrice = ''
    deliveryOptions.forEach((option,index)=>{
      const isChecked = option.id === product.deliveryOptionId 
      delPrice = option.priceCents === 0 ? 'FREE Shipping' : '$' + convretToDollars(option.priceCents) + ' Shipping'   
      delOptionHtml +=`<div class="delivery-option" >
                    <input type="radio" ${isChecked ? 'checked' : ''}
                      class="delivery-option-input"
                      name="${product.productId}-delivery-option" data-delivery-id = "${option.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${deliveryOptionDays(option.id)}
                      </div>
                      <div class="delivery-option-price">
                        ${delPrice}
                      </div>
                    </div>
                  </div>`
    })
    return delOptionHtml           
  }

  //CheckOut page loader
  cart.forEach((product)=>{  
      let chosenDate =  ''
      currentProd = products.find(({id})=>id === product.productId)
      if (!product['deliveryOptionId']) { 
        product['deliveryOptionId'] = '1'
        saveCartStorage(cart)
      }
      
      deliveryOptions.forEach((option) =>{
        if(option.id === product.deliveryOptionId){
          chosenDate = deliveryOptionDays(option.id)
        }
      })
      
      cartProdHtml +=`<div class="cart-item-container" data-product-id = "${currentProd.id}">
              <div class="delivery-date">
                Delivery date: ${chosenDate} 
              </div>
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${currentProd.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${currentProd.name}
                  </div>
                  <div class="product-price">
                    $${convretToDollars(currentProd.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${product.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class = "save-quantity hidden-span link-primary">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary" >
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                    ${addDeliveryOptions(product)}
                  </div>
                </div>
              </div>
            </div>`
    
  })
  showProductsEl.innerHTML = cartProdHtml
  let itemContainers = document.querySelectorAll('.cart-item-container')

  itemContainers.forEach((container)=>{
      let prodId = container.dataset.productId
      let deleteItemEl = container.querySelector('.delete-quantity-link')
      let updateItemEl = container.querySelector('.update-quantity-link')
      let saveItemEl   = container.querySelector('.save-quantity')
      let getQuantityLabel = container.querySelector('.quantity-label')
      let productIndex = cart.findIndex(({productId})=>productId===prodId)
      let deliveryDateEl = container.querySelector('.delivery-date')
      let deliveryOptionEls = container.querySelectorAll('.delivery-option-input')
      

      //Delete Product From Cart
      deleteItemEl.addEventListener('click', ()=>{
          let cartIndex = cart.findIndex((prod)=> prod.productId === prodId)
          cart.splice(cartIndex,1)
          saveCartStorage(cart)
          renderOrderSummary()
        })

      //Update Product Quantity
      updateItemEl.addEventListener('click', ()=>{
            getQuantityLabel.innerHTML = `<input class = 'input-quantity-value' type = 'number' value = "${cart[productIndex].quantity}" min="1" ></input>`
            saveItemEl.classList.toggle('hidden-span')
            updateItemEl.classList.toggle('hidden-span')
          })
        
      //Save New Quantity
      saveItemEl.addEventListener('click',()=>{
              let inputValue = container.querySelector('.input-quantity-value').value
              cart[productIndex].quantity = Number(inputValue)
              saveCartStorage(cart)
              saveItemEl.classList.toggle('hidden-span')
              updateItemEl.classList.toggle('hidden-span')
              renderOrderSummary()
            })

      //Update Delivery Options
    deliveryOptionEls.forEach((option)=>{
              option.addEventListener('click', ()=>{
                updateDeliveryOption(prodId,option.dataset.deliveryId)
                renderOrderSummary()})
              })

  })
      
 renderPaymentSummary()
 
}
