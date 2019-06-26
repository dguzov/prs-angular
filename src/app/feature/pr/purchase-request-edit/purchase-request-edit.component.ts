import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/purchase-request.class';
import { PurchaseRequestService } from '@svc/purchase-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@svc/user.service';
import { User } from '@model/user.class';

@Component({
  selector: 'app-purchase-request-edit',
  templateUrl: './purchase-request-edit.component.html',
  styleUrls: ['./purchase-request-edit.component.css']
})
export class PurchaseRequestEditComponent implements OnInit {
  title: string = "PurchaseRequest Edit";
  purchaseRequestIdStr: string;
  jr: JsonResponse;
  purchaseRequest: PurchaseRequest;
  users: User[];

  constructor(private purchaseRequestSvc: PurchaseRequestService,
    private router: Router,
    private userSvc: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //get the purchaseRequest from db
    this.route.params.subscribe(params =>
      this.purchaseRequestIdStr = params['id']);
    this.purchaseRequestSvc.get(this.purchaseRequestIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.purchaseRequest = this.jr.data as PurchaseRequest;
    });
    this.userSvc.list()
      .subscribe(
        jresp => {
          this.jr = jresp;
          this.users = this.jr.data as User[];

        });
  }
  edit() {
    this.purchaseRequestSvc.edit(this.purchaseRequest).subscribe(
      jresp => {
        this.jr = jresp;
        this.purchaseRequest = this.jr.data as PurchaseRequest;
        this.router.navigate(['/pr/list']);
      }
    );
  }
  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }
}