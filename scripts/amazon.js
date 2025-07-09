const productGridEl = document.querySelector('.products-grid')
let productHtml = ''
let itemPrice = 0
let  ratingImg =''
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
            <select>
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

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`
   
})
productGridEl.innerHTML+= productHtml
let addConfirmationEls = document.querySelectorAll('.added-to-cart')
let addButtonsEl = document.querySelectorAll('.add-to-cart-button')

for (let i = 0;i<addButtonsEl.length;i++){
  addButtonsEl[i].addEventListener('click', ()=>{
    confirmationVisible(i)})

}

function confirmationVisible(index){
  let timeoutID
  clearTimeout(timeoutID)
  addConfirmationEls[index].classList.add('visible-confirmation')
  timeoutID = setTimeout(()=>{
    addConfirmationEls[index].classList.remove('visible-confirmation')
  },2000)
  
}