import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'obiectivCultura',
  templateUrl: './obiectivCultura.component.html',
  styleUrls: ['./obiectivCultura.component.css']
})

export class ObiectivCulturaComponent implements OnInit {
  obiectiv: any;
  obiectivId: Number;

  ngOnInit() {
    this.getObiectivById();
    console.log('obj');
  }

  constructor(private http: Http, private store: StorageServiceService) { }

  getObiectivById() {
    var urlToParse = location.search;
    var result = this.parseUrlParams(urlToParse);
    this.obiectivId = JSON.parse(JSON.stringify(result)).id;
    this.http.get('http://localhost:3000/obiectiveCultura/' + this.obiectivId).map(res => res.json()).subscribe(response => this.obiectiv = response);
  }

  addToList() {
    this.store.appendToData(this.obiectivId);
    console.log(this.obiectivId);
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
