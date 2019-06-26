import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { HttpClient } from '@angular/common/http';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestLineItem } from '@model/purchase-request-line-item.class';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestLineItemService {

  url: string = "http://localhost:8080/purchase-request-line-items/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }
  get(purchaseRequestLineItemId: string): Observable<JsonResponse> {
    return this.http.get(this.url+purchaseRequestLineItemId) as Observable<JsonResponse>;
  }
  create(purchaseRequestLineItem: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.post(this.url, purchaseRequestLineItem) as Observable<JsonResponse>;
  }
  edit(purchaseRequestLineItem: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.put(this.url, purchaseRequestLineItem) as Observable<JsonResponse>;
  }
  remove(purchaseRequestLineItem: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.delete(this.url+purchaseRequestLineItem.id) as Observable<JsonResponse>;
  }
  getLines(purchaseRequestId: string): Observable<JsonResponse> {
    return this.http.get(this.url+'lines-for-pr/'+purchaseRequestId) as Observable<JsonResponse>;
  }
  }