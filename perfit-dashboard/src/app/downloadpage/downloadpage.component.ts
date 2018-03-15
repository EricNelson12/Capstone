import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService, CookieOptions } from 'angular2-cookie/core';


@Component({
  selector: 'app-downloadpage',
  templateUrl: './downloadpage.component.html',
  styleUrls: ['./downloadpage.component.css']
})
export class DownloadpageComponent implements OnInit {

  constructor(private cookieService:CookieService, 
    
    private router: Router) { }

  ngOnInit() {
    if(this.cookieService.get('guest') == "true"){
      this.router.navigate(['guestpost']);

      
    }

  }

}
