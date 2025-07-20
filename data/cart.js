export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function totalQuantityCalc(){
    let  totalQuantity = 0 
    cart.forEach((product) => {
        totalQuantity+=Number(product.quantity)
        })
    return totalQuantity
};

export function saveCartStorage(cart){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function cartItmeDisplay(totalQuantity){
    return (totalQuantity>0) ? totalQuantity : '' 
}