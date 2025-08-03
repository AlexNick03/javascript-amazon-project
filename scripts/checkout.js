import {renderOrderSummary} from './checkout/orderSummary.js'
import {cart,saveCartStorage } from '../data/cart.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//Randare protiune cu recapitularea comenzii 

//Promise all
Promise.all([
    
    loadProductsFetch(),

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve()
        });

    })
    

]).then(()=>{
    renderOrderSummary()

//Reset button Function For Tests 
    let resetCartBtn = document.querySelector('.reset-cart')
    resetCartBtn.addEventListener('click', resetCart)
    function resetCart(){
        cart.splice(0,cart.length)
        saveCartStorage(cart)
        renderOrderSummary()
    }
});


/*

// Multiple promises
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('value1');
    });
    
}).then((value)=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve()
        });

    });
    
}).then(()=>{
    renderOrderSummary()

//Reset button Function For Tests 
    let resetCartBtn = document.querySelector('.reset-cart')
    resetCartBtn.addEventListener('click', resetCart)
    function resetCart(){
        cart.splice(0,cart.length)
        saveCartStorage(cart)
        renderOrderSummary()
    }
})


// CallBacks

/*loadProducts(()=>{
    loadCart(()=>{
         renderOrderSummary()

//Reset button Function For Tests 
    let resetCartBtn = document.querySelector('.reset-cart')
    resetCartBtn.addEventListener('click', resetCart)
    function resetCart(){
        cart.splice(0,cart.length)
        saveCartStorage(cart)
        renderOrderSummary()
    }})
    
    })
*/