export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function totalQuantityCalc(totalQuantity){cart.forEach((product) => {
    totalQuantity+=Number(product.quantity)
    })
    return totalQuantity
};

