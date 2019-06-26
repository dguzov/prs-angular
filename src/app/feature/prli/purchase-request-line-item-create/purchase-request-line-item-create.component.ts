import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequestLineItem } from '@model/purchase-request-line-item.class';
import { PurchaseRequestLineItemService } from '@svc/purchase-request-line-item.service';
import { SystemService } from '@svc/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { PurchaseRequest } from '@model/purchase-request.class';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';

@Component({
  selector: 'app-purchase-request-line-item-create',
  templateUrl: './purchase-request-line-item-create.component.html',
  styleUrls: ['./purchase-request-line-item-create.component.css']
})
export class PurchaseRequestLineItemCreateComponent implements OnInit {
  title: string = "PurchaseRequestLineItem-Create";
  jr: JsonResponse;
  purchaseRequestLineItem: PurchaseRequestLineItem = new PurchaseRequestLineItem();
  purchaseRequest: PurchaseRequest;
  products: Product[];
  purchaseRequestIdStr: string;
  //prId: PurchaseRequest[] = [];
  //authenticatedUser: User[];

  constructor(private purchaseRequestLineItemSvc: PurchaseRequestLineItemService,
    private purchaseRequestSvc: PurchaseRequestService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
     //this.purchaseRequest.user = this.sysSvc.data.user.instance;
    //this.purchaseRequestLineItem.purchaseRequest = this.purchaseRequestSvc.get.purchaseRequestId;
   
      this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        this.products = this.jr.data as Product[];
      }
    );
    this.route.params.subscribe(params =>
      this.purchaseRequestIdStr = params['id']);

    this.purchaseRequestSvc.get(this.purchaseRequestIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
      this.purchaseRequestLineItem.purchaseRequest = this.purchaseRequest;
    });
  }

  create() {
    this.purchaseRequestLineItemSvc.create(this.purchaseRequestLineItem)
        .subscribe(resp => {
          this.jr = resp;
          console.log(this.jr);
    this.router.navigate(['/pr/lines/'+this.purchaseRequest.id]);

        });
  }
}

