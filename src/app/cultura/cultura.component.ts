import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'cultura',
  templateUrl: './cultura.component.html',
    styleUrls:['./cultura.component.css']
})

export class CulturaComponent implements OnInit{
  obiective:any;

ngOnInit() {
  this.getObiectiveCultura();
  console.log('cultura');
}

constructor(private http:Http) { }

getObiectiveCultura() {
  this.http.get('http://localhost:3000/obiectiveCultura').map(res => res.json()).subscribe(response => this.obiective = response);
}

}
