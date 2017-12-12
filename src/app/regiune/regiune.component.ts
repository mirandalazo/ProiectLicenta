import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'regiune',
  templateUrl: './regiune.component.html',
  styleUrls: ['./regiune.component.css']
})

export class RegiuneComponent implements OnInit {
  regiune:any;
  regiuneId:number;

  ngOnInit(){
    this.getRegiuneById();
    console.log("reg");
  }

    constructor(private http: Http){}

    getRegiuneById() {
      var urlToParse = location.search;
      var result = this.parseUrlParams(urlToParse);
      this.regiuneId = JSON.parse(JSON.stringify(result)).id;
      this.http.get('http://localhost:3000/regiune/' + this.regiuneId).map(res => res.json()).subscribe(response => this.regiune = response);
    }

    parseUrlParams(url) {
      var urlParams = {};
      url.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) {
          urlParams[$1] = $3;
        }
      );

      return urlParams;
    }
}

//soo
