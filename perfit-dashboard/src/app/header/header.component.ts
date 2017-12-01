import { Component, OnInit} from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = ""; 

  constructor(private cookieService:CookieService) { 
		this.user = this.cookieService.get('username');
  }


  ngOnInit(){}
  	
 }
