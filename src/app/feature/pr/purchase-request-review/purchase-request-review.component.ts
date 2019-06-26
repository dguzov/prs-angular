import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { JsonResponse } from '@model/json-response.class';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from '@svc/system.service';

@Component({
  selector: 'app-purchase-request-review',
  templateUrl: './purchase-request-review.component.html',
  styleUrls: ['./purchase-request-review.component.css']
})
export class PurchaseRequestReviewComponent implements OnInit {

  purchaseRequestIdStr: string;
  jr: JsonResponse;
  purchaseRequests: PurchaseRequest[];
  title: string = 'PurchaseRequest-Review';
  userId: string;

  constructor(private purchaseRequestSvc: PurchaseRequestService,
    private router: Router,
    private sysSvc: SystemService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    if(this.sysSvc.data.user.loggedIn) {
      this.userId = this.sysSvc.data.user.instance.id;
    }
    else{
      console.error("User not logged in!");
    }
    this.purchaseRequestSvc.listReview(this.userId).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.purchaseRequests = this.jr.data as PurchaseRequest[];
        }
        else {
          //Houston we have a porblem
          console.log("Error getting purchaseRequests");
          //ToDo - implement error handling???
        }
      })
    }
  }

