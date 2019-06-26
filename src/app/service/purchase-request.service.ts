import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { HttpClient } from '@angular/common/http';
import { PurchaseRequest } from '@model/purchase-request.class';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {

  url: string = "http://localhost:8080/purchase-requests/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }
  get(purchaseRequestId: string): Observable<JsonResponse> {
    return this.http.get(this.url + purchaseRequestId) as Observable<JsonResponse>;
  }
  create(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.post(this.url + "submit-new", purchaseRequest) as Observable<JsonResponse>;
  }
  edit(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url, purchaseRequest) as Observable<JsonResponse>;
  }
  remove(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.delete(this.url + purchaseRequest.id) as Observable<JsonResponse>;
  }
  submitForReview(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + "submit-review", purchaseRequest) as Observable<JsonResponse>;
  }
  listReview(userid: string): Observable<JsonResponse> {
    return this.http.get(this.url + "list-review/" + userid) as Observable<JsonResponse>;
  }
  approve(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + "approve", purchaseRequest) as Observable<JsonResponse>;
  }
  reject(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + "reject", purchaseRequest) as Observable<JsonResponse>;
}
}