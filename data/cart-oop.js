const cart = {
    cartItems : JSON.parse(localStorage.getItem('cart')) || [],
    totalQuantityCalc: function(){
        let  totalQuantity = 0 
        this.cartItems.forEach((product) => {
            totalQuantity+=Number(product.quantity)
            })
        return totalQuantity
    },
    saveCartStorage(){
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
    },
    
    cartItmeDisplay(){
        return (this.totalQuantityCalc>0) ? this.totalQuantityCalc : '' 
}
}
console.log(cart);



