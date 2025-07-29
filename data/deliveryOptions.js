import { cart } from "../data/cart.js";
import { saveCartStorage } from "../data/cart.js";
import  dayjs  from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
export const deliveryOptions = [
{
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
},

{
    id: '2',
    deliveryDays: 5,
    priceCents: 499
},

{
    id:'3',
    deliveryDays: 1,
    priceCents:999
}
];

export function updateDeliveryOption(productId,deliveryId){
    cart.forEach((prod) => {
        if (prod.productId == productId){
            prod.deliveryOptionId = deliveryId
        }
    });
    saveCartStorage(cart)
}

export function deliveryOptionDays(deliveryId){
    const today = dayjs()
    let chosenDate
    deliveryOptions.forEach((option)=>{
        if (option.id===deliveryId){
            
            if(today.add(option.deliveryDays,'days').get('day')===0){
               chosenDate = today.add(option.deliveryDays+1,'days').format('dddd, MMMM D')

            }
            else if (today.add(option.deliveryDays,'days').get('day')===6){
               
               chosenDate = today.add(option.deliveryDays+2,'days').format('dddd, MMMM D')
            }
            else {
              
               chosenDate = today.add(option.deliveryDays,'days').format('dddd, MMMM D')
            }
            
        } 
        
    })
    return chosenDate

}