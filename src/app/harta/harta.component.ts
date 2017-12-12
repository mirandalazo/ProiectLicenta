import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'harta',
  templateUrl: './harta.component.html',
  styleUrls: ['./harta.component.css']
})
export class HartaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    var urlToParse = location.search;
    var result = this.parseUrlParams(urlToParse);
    let coords = JSON.parse(JSON.stringify(result));

    var uluru = { lat: parseFloat(coords.lat), lng: parseFloat(coords.lng) };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
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

} // unde e butonu care duce spre harta ?
