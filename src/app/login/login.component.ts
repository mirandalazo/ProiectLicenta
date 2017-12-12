import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  data : {
    email: String,
    password: String
  } = {
    email: "",
    password: ""
  }

  ngOnInit() {
    console.log('login');
  }

  loginUser() {
    if(this.data.email != "") {
        let url = "http://localhost:3000/loginUser";
        var response = this.http.post(url, this.data).map(res => res.json());
        response.subscribe(res => {
          let rsp = parseInt(res.status);
          if(rsp) {
            this.ss.addCookie("user", res.user);
            alert("Autentificare cu succes.");
            location.reload();
          }else{
            alert("Autentificare nereusita.");
          }
        })
    }else alert("Empty fields");
  }

  constructor(private http: Http, private ss: StorageServiceService) { }
}
