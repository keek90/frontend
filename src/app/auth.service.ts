import { Injectable, OnInit} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
    providedIn:'root'
})
export class AuthService implements OnInit{

isAuthenticated:boolean=false;
constructor(private auth:AngularFireAuth){}
   ngOnInit(): void {
       this.auth.authState.subscribe(user=>{
        this.isAuthenticated=!!user;
       });
   }

 }
    