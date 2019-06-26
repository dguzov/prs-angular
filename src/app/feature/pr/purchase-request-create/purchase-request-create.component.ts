import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { Route, Router } from '@angular/router';
import { UserService } from '@svc/user.service';
import { User } from '@model/user.class';
import { SystemService } from '@svc/system.service';

@Component({
  selector: 'app-purchase-request-create',
  templateUrl: './purchase-request-create.component.html',
  styleUrls: ['./purchase-request-create.component.css']
})
export class PurchaseRequestCreateComponent implements OnInit {
  title: string = "PurchaseRequest-Create";
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest = new PurchaseRequest;
  //authenticatedUser: User[];

  constructor(private purchaseRequestSvc: PurchaseRequestService,
    private sysSvc: SystemService,
    private router: Router) { }

  ngOnInit() {
        if(this.sysSvc.data.user.loggedIn){
      this.purchaseRequest.user = this.sysSvc.data.user.instance;
    }
else{
  console.error("User not logged in.");
}
  }

  create() {
  //  this.purchaseRequest.total = 0;
    this.purchaseRequestSvc.create(this.purchaseRequest)
        .subscribe(resp => {
          this.jr = resp;
    this.router.navigate(['/pr/list']);

        });
  }
}
