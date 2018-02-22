import { Injectable } from '@angular/core';
import * as marked from 'marked';


@Injectable()
export class MarkdownService {


  private md: any;

  constructor() { 
  	this.md = marked;

  	this.md.setOptions({
  		gfm: true,
  		breaks: true
  	});

  }


  converted(markdown: string){
  	return this.md.parse(markdown);

  }


}



//take text and pass it through marked library and recive results from marked