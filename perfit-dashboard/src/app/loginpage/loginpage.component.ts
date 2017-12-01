import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

    private admin2;
    private password2;
    errorMessage = ""; 
    errorMessage2 = ""; 

  constructor(private router: Router,private cookieService:CookieService, private authService: AuthService) { 
  }

  ngOnInit() {
        this.cookieService.put('loggedin', 'false');
        console.log('the cookie is',this.cookieService.get('loggedin'));


  }

  public validated(){

  }


  loginUser(e){
  	e.preventDefault();
  	console.log(e);
  	var username = e.target.elements[0].value;
  	var password = e.target.elements[1].value;
  	
    this.authService.login(username,password)
      .subscribe(
           success => {
            this.cookieService.put('loggedin', 'true');
            this.cookieService.put('username', username);
            console.log('the cookie is',this.cookieService.get('loggedin'));
            this.router.navigate(['dashboard']);

           }, 
           error => {
             this.errorMessage = error
           }
        );



  }


}
