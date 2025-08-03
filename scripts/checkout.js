import {renderOrderSummary} from './checkout/orderSummary.js'
import {cart,saveCartStorage } from '../data/cart.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//Randare protiune cu recapitularea comenzii 


//Asyn Await

async function loadPage(){
    try {
        //throw 'error1';
        await  loadProductsFetch();

    const value = await  new Promise((resolve, reject)=>{ //value 3 
        loadCart(()=>{
            //reject ('error3')
            resolve('Value3')
        });
    })
    }
    catch(error) {
        console.log('Unexpected error');
        
    }
    
    renderOrderSummary()

//Reset button Function For Tests 
    let resetCartBtn = document.querySelector('.reset-cart')
    resetCartBtn.addEventListener('click', resetCart)
    function resetCart(){
        cart.splice(0,cart.length)
        saveCartStorage(cart)
        renderOrderSummary()
    }
    

}
loadPage();


/*
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