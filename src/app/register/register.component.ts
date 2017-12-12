import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as CryptoJS from '../../../node_modules/crypto-js';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userModel: {
    nume: String,
    prenume: String,
    email: String,
    parola: String,
    tara: String
  } = {
    nume: "",
    prenume: "",
    email: "",
    parola: "",
    tara: ""
  }

  // incercam sa nu il las sa le introduca in bd daca sunt nule dar nu merge
  constructor(private http: Http) { }

  register() {
    let url = "http://localhost:3000/registerUser"
    if (this.userModel.nume != "" && this.userModel.prenume != "" && this.userModel.email != "" && this.userModel.parola != "" && this.userModel.tara != "") {
      this.http.post(url, this.userModel).map(res => res.json() || {}).subscribe(result => alert(result.mesaj))
    } else {
      alert("Not complete");
    }
  }

  ngOnInit() {
    console.log('register');
  }
}
