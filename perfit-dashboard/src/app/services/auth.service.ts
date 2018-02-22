import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { 

  }


  login(email,password): Observable<any>{
  	return Observable.fromPromise(
  		this.afAuth.auth.signInWithEmailAndPassword(email, password)
  		);
  }


}
