import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'obiectiv',
  templateUrl: './obiectiv.component.html',
  styleUrls: ['./obiectiv.component.css']
})

export class ObiectivComponent implements OnInit {
  obiectiv: any;
  obiectivId: Number;
  loggedIn: boolean = false;
  userData: any;

  ngOnInit() {
    this.getObiectivById();
    console.log('obj');
  }

  constructor(private http: Http, private store: StorageServiceService) {
    if(store.checkCookie("user")) {
      this.userData = JSON.parse(store.getCookie("user"));
      this.loggedIn = true;
    }
  }

  getObiectivById() {
    var urlToParse = location.search;
    var result = this.parseUrlParams(urlToParse);
    this.obiectivId = JSON.parse(JSON.stringify(result)).id;
    this.http.get('http://localhost:3000/obiectiveNatura/' + this.obiectivId).map(res => res.json()).subscribe(response => this.obiectiv = response);
  }

  addToList() {
    this.store.appendToData(this.obiectivId);
    this.addToDb();
  }

  addToDb() {
    let utilizatoriId = this.userData.id;
    let obiectiveId = this.obiectivId;
    this.http.post('http://localhost:3000/addCard', { "utilizatoriId": utilizatoriId, "obiectiveId": obiectiveId}).map(res => res.json()).subscribe(response => console.log(response));
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
