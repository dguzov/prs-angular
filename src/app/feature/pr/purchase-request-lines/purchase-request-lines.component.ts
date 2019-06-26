import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequestLineItem } from '@model/purchase-request-line-item.class';
import { PurchaseRequestLineItemService } from '@svc/purchase-request-line-item.service';

@Component({
  selector: 'app-purchase-request-lines',
  templateUrl: './purchase-request-lines.component.html',
  styleUrls: ['./purchase-request-lines.component.css']
})
export class PurchaseRequestLinesComponent implements OnInit {

  title: string = "PurchaseRequest-Lines";
  purchaseRequestIdStr: string;
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest;
  prlis: PurchaseRequestLineItem[] = [];
  purchaseRequestLineItem: PurchaseRequestLineItem;


  constructor(private purchaseRequestSvc: PurchaseRequestService,
    private purchaseRequestLineItemSvc: PurchaseRequestLineItemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //get the purchaseRequest from db

    this.route.params.subscribe(params =>
      this.purchaseRequestIdStr = params['id']);

    this.purchaseRequestSvc.get(this.purchaseRequestIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
    });

    this.purchaseRequestLineItemSvc.getLines(this.purchaseRequestIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.prlis = this.jr.data as PurchaseRequestLineItem[];

    });
  }

  remove(prli) {
    this.purchaseRequestLineItemSvc.remove(prli).subscribe(
      jresp => {
        this.jr = jresp;
        this.purchaseRequestLineItem = this.jr.data as PurchaseRequestLineItem;
        this.refresh();
      }
    );
  }

  refresh(): void {
    this.purchaseRequestLineItemSvc.getLines(this.purchaseRequestIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.prlis = this.jr.data as PurchaseRequestLineItem[];
    });
    this.purchaseRequestSvc.get(this.purchaseRequestIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
    });
  }
submitForReview() {
  this.purchaseRequestSvc.submitForReview(this.purchaseRequest)
  .subscribe(resp => {
    this.jr = resp;
    this.purchaseRequest = this.jr.data as PurchaseRequest;
    this.router.navigate(['/pr/list']);
  })
}
}