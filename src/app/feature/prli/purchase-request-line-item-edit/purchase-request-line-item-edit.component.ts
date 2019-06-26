import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@svc/user.service';
import { User } from '@model/user.class';
import { PurchaseRequestLineItem } from '@model/purchase-request-line-item.class';
import { Product } from '@model/product.class';
import { PurchaseRequestLineItemService } from '@svc/purchase-request-line-item.service';
import { ProductService } from '@svc/product.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-purchase-request-line-item-edit',
  templateUrl: './purchase-request-line-item-edit.component.html',
  styleUrls: ['./purchase-request-line-item-edit.component.css']
})
export class PurchaseRequestLineItemEditComponent implements OnInit {
  title: string = "PurchaseRequestLineItem Edit";
  purchaseRequestLineItemIdStr: string;
  jr: JsonResponse;
  purchaseRequestLineItem: PurchaseRequestLineItem;
  products: Product[];
  purchaseRequest: PurchaseRequest;

  constructor(private purchaseRequestLineItemSvc: PurchaseRequestLineItemService,
    private router: Router,
    private productSvc: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //get the purchaseRequest from db
    this.route.params.subscribe(params =>
      this.purchaseRequestLineItemIdStr = params['id']);
    this.purchaseRequestLineItemSvc.get(this.purchaseRequestLineItemIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequestLineItem = this.jr.data as PurchaseRequestLineItem;
    });
    this.productSvc.list()
      .subscribe(
        jresp => {
          this.jr = jresp;
          this.products = this.jr.data as Product[];

        });
  }
  edit() {
    this.purchaseRequestLineItemSvc.edit(this.purchaseRequestLineItem).subscribe(
      jresp => {
        this.jr = jresp;
        this.purchaseRequestLineItem = this.jr.data as PurchaseRequestLineItem;
        this.router.navigate(['/pr/lines/' + this.purchaseRequestLineItem.purchaseRequest.id]);
      }
    );
  }
  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

  remove() {
    this.purchaseRequestLineItemSvc.remove(this.purchaseRequestLineItem).subscribe(
      jresp => {
        this.jr = jresp;
        this.purchaseRequestLineItem = this.jr.data as PurchaseRequestLineItem;
        this.router.navigate(['/pr/lines/' + this.purchaseRequestLineItem.purchaseRequest.id]);
      }
    );
  }
}

