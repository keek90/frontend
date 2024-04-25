import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { IUser } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath ="/userdetails";
  userRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
    
   }
   getAllDetails(){
    return this.userRef;
   }
   getDetail(key:string){
    return this.db.object(`${this.dbPath}/${key}`);
   }
   addDetail(user: IUser){
    this.userRef.push(user);
   }
   deleteExpense(key: string){
    return this.userRef.remove(key);
    }
    updateExpense(key: string,expense: IUser){
      this.userRef.update(key,expense);
     }
    
  


}
