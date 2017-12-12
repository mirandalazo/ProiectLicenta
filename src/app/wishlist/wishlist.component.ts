import {Component, OnInit} from '@angular/core';
import { StorageServiceService } from '../storage-service.service';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {
  userData: any;
  obiectivId: Number;
  wishItems: any;

  ngOnInit() {
    console.log('wishlist');
  }

  constructor(private ss: StorageServiceService, private http: Http) {
    if(ss.checkCookie("user")) {
      this.userData = JSON.parse(ss.getCookie("user"));
    }
    this.getWishList();
  }

  getWishList() {
    let data = "[" + this.ss.getData().toString() + "]";
    this.http.post('http://localhost:3000/getAllObiectiveByIds', { "ids": data }).map(res => res.json()).subscribe(response => { this.wishItems = response; console.log(response) });
  }

  removeWishItem(id) {
    this.ss.removeFromData(id);
    this.removeFromDb(id);
    location.reload();
  }

  removeFromDb(id) {
    let utilizatoriId = this.userData.id;
    this.http.post('http://localhost:3000/removeCard',{"uid": utilizatoriId, "cid": id}).map(res => res.json()).subscribe(response => { console.log(response) });
  }
}
