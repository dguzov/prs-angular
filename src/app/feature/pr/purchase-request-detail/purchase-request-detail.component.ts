import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-request-detail',
  templateUrl: './purchase-request-detail.component.html',
  styleUrls: ['./purchase-request-detail.component.css']
})
export class PurchaseRequestDetailComponent implements OnInit {
  title: string = "PurchaseRequest Detail";
  purchaseRequestIdStr: string;
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest;

  constructor(private purchaseRequestSvc: PurchaseRequestService,
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
  }
  remove() {
    this.purchaseRequestSvc.remove(this.purchaseRequest).subscribe(
      jresp => {
        this.jr = jresp;
                this.purchaseRequest = this.jr.data as PurchaseRequest;
                console.log('Can not remove purchaseRequest which has the Line Items.')
        this.router.navigate(['/pr/list']);
      }
    );
  }

}