import { Component } from '@angular/core';
import { StorageServiceService } from './storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  userData : any;
  isAdmin: boolean = false;

  constructor(private ss: StorageServiceService) {
    if(ss.checkCookie("user")) {
      this.userData = JSON.parse(ss.getCookie("user"));
      if(this.userData.nume == 'admin'){
        this.isAdmin = true;
      }
    }
  }

  logout() {
    this.ss.removeCookie("user");
    alert("Deautenticare efectuata !");
    location.reload();
  }
}
