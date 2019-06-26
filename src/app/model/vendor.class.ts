import { TmplAstBoundText } from '@angular/compiler';

export class Vendor {
    id: number;
    code: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber: string;
    email: string;
    preApproved: boolean;
    
    constructor(id: number =0,
        code: string = '', name: string ='', address: string ='', city: string='',
        state: string='', zip: string='', phoneNumber: string='', email: string='',
        preApproved:boolean=false){
            
        }

        about(): string{
            return 
            "Vendor: id="+this.id +
            ", code"+this.code+
            ", name+"+this.name+
            ", address="+this.address+
            ", city="+this.city+
            ", state="+this.state+
            ", zip="+this.zip+
            ", phoneNumber="+this.phoneNumber+
            ", email="+this.email+
            ", preApproved="+this.preApproved;
        }
}
