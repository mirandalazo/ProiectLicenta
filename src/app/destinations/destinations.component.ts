import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})

export class DestinationsComponent implements OnInit {

  destinations: any;

  ngOnInit() {
    this.getDestinations();
    console.log('dest', this.destinations);

  }

  constructor(private http: Http) {

  }

  getDestinations() {
    this.http.get('http://localhost:3000/regiuni').map(res => res.json()).subscribe(response => this.destinations = response);
  }
}
