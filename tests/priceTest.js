import {convretToDollars} from '../utils/price.js'

if (convretToDollars(2095)==='20.95'){
    
    
    console.log('Passed');
    
}
else {
    console.log('Failed');
    
}
if (convretToDollars(0)==='0.00'){
    
    
    console.log('Passed');
    
}
else {
    console.log('Failed');
    
}

if (convretToDollars(2000.5)==='20.01'){
    
    
    console.log('Passed');
    
}
else {
    console.log('Failed');
    
}
if (convretToDollars(2000.4)==='20.00'){
    
    
    console.log('Passed');
    
}
else {
    console.log('Failed');
    
}