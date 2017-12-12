import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'natura',
  templateUrl: './natura.component.html',
  styleUrls: ['./natura.component.css']
})

export class NaturaComponent implements OnInit {
  obiective: any;

  ngOnInit() {
    this.getObiectiveNatura();
    console.log('natura');
  }

  constructor(private http: Http) { }

  getObiectiveNatura() {
    this.http.get('http://localhost:3000/obiectiveNatura').map(res => res.json()).subscribe(response => this.obiective = response);
  }

}
