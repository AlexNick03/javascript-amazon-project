import {convretToDollars} from '../utils/price.js'

describe('test suite: convertToDollars', ()=>{
    it('converts cents into dollars', ()=>{
        expect(convretToDollars(2095)).toEqual('20.95');
    });
     it('Works with 0', ()=>{
        expect(convretToDollars(0)).toEqual('0.00');
    });
     it('rounds up to the neareset cent', ()=>{
        expect(convretToDollars(2000.5)).toEqual('20.01');
    });

});

