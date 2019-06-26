import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { JsonResponse } from '@model/json-response.class';

@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {
  jr: JsonResponse;
  purchaseRequests: PurchaseRequest[];
  title: string = 'PurchaseRequest-List';
  sortCriteria: string = "id";
  sortOrder: string = "asc"; // or anything else for desc

  constructor(private purchaseRequestSvc: PurchaseRequestService) { }

  ngOnInit() {
    this.purchaseRequestSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.purchaseRequests = this.jr.data as PurchaseRequest[];
        }
        else {
          //Houston we have a porblem
          console.log("Error getting products");
          //ToDo - implement error handling???
        }
      }
    )
  }
  sortBy(column: string): void {
    if (this.sortCriteria === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCriteria = column;
      this.sortOrder = 'asc';
    }
  }
}
