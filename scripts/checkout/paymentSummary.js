import {products} from '../../data/products.js'
import {cart, totalQuantityCalc} from '../../data/cart.js';
import {convretToDollars} from '../../utils/price.js'
import {deliveryOptions} from '../../data/deliveryOptions.js'




export function renderPaymentSummary(){
    let paymentHtml = ''
    let paymentSummmaryEl = document.querySelector('.payment-summary')
    let totalProdPrice = 0
    let totalDeliveryPrice = 0 
    let priceBeforeTax = 0 
    let totalPrice =  0 
    let tax = 0
    //Price Calculation 

    cart.forEach(product => {
         let prodPrice = products.find((prod) => prod.id === product.productId).priceCents

         totalProdPrice += Number(prodPrice*product.quantity)
         totalDeliveryPrice+=Number(deliveryOptions.find((option)=>option.id === product.deliveryOptionId).priceCents)
    });
    priceBeforeTax = totalProdPrice + totalDeliveryPrice
    tax = priceBeforeTax*0.1
    totalPrice = priceBeforeTax + tax
    paymentHtml = ` <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div >Items (${totalQuantityCalc()}):</div>
            <div class="payment-summary-money">$${convretToDollars(totalProdPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${convretToDollars(totalDeliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${convretToDollars(priceBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${convretToDollars(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${convretToDollars(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`


paymentSummmaryEl.innerHTML = paymentHtml
}