import { TmplAstBoundText } from '@angular/compiler';
import { User } from './user.class';

export class PurchaseRequest {
    id: number;
    user: User;
    description: string;
    justification: string;
    dateNeeded: Date;
    deliveryMode: string;
    status: string;
    total: number;
    submittedDate: Date;
    reasonForRejection: string;

        constructor(Id: number = 0, user: User = null, description: string = '', justification: string = '', dateNeeded: Date = null,
        deliveryMode: string = '', status: string='', total: number=0, submittedDate: Date=null, reasonForRejection: string = '') 
        {
this.id = Id;
this.user = user;
this.description = description;
this.justification = justification;
this.dateNeeded = dateNeeded;
this.deliveryMode = deliveryMode;
this.status = status;
this.total = total;
this.submittedDate = submittedDate;
this.reasonForRejection = reasonForRejection;
}


    }