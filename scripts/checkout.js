import {renderOrderSummary} from './checkout/orderSummary.js'
import {cart,saveCartStorage } from '../../data/cart.js';

//Randare protiune cu recapitularea comenzii 

renderOrderSummary()

//Reset button Function For Tests 
    let resetCartBtn = document.querySelector('.reset-cart')
    resetCartBtn.addEventListener('click', resetCart)
    function resetCart(){
        cart.splice(0,cart.length)
        saveCartStorage(cart)
        renderOrderSummary()
    
    }  