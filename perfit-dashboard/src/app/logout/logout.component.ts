import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private cookieService:CookieService) { }

  ngOnInit() {
  	this.cookieService.put('loggedin', 'false');
  	console.log('is user loggedin ?',this.cookieService.get('loggedin'));
  	this.router.navigate(['/']);
  }

}
