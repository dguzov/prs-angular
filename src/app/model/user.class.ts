import { TmplAstBoundText } from '@angular/compiler';

export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    reviewer: boolean;
    admin: boolean;

    constructor(id: number =0,
        userName: string = '', password: string ='', firstName: string ='', lastName: string='',
        phoneNumber: string='', email: string='', reviewer:boolean=false, admin: boolean=false ){
            
        }

        about(): string{
            return 
            "User: id="+this.id +
            ", un"+this.userName+
            ", pwd+"+this.password+
            ", fname="+this.firstName+
            ", lname="+this.lastName+
            ", pn="+this.phoneNumber+
            ", email="+this.email+
            ", rvw="+this.reviewer+
            ", adm="+this.admin;
        }
}
