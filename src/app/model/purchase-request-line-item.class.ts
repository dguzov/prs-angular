import { TmplAstBoundText } from '@angular/compiler';
import { PurchaseRequest } from './purchase-request.class';
import { Product } from './product.class';

export class PurchaseRequestLineItem {
    id: number;
    purchaseRequest: PurchaseRequest;
    product: Product;
    quantity: number;
    
    constructor(Id: number = 0, purchaseRequest: PurchaseRequest = null, 
        product: Product = null, quantity: number = 0) 
    {
        this.id = Id;
        this.purchaseRequest = purchaseRequest;
        this. product = product;
        this. quantity = quantity;
}       
    }