import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'gastro',
  templateUrl: './gastro.component.html',
    styleUrls:['./gastro.component.css']
})

export class GastroComponent implements OnInit{

ngOnInit() {
  console.log('gastro');
}

constructor() { }
}
