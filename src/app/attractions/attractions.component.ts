import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'attractions',
  templateUrl: './attractions.component.html',
    styleUrls:['./attractions.component.css']
})

export class AttractionsComponent implements OnInit{

ngOnInit() {
  console.log('attractions');
}

constructor() { }
}
