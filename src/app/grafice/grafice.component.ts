import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'grafice',
  templateUrl: './grafice.component.html',
  styleUrls: ['./grafice.component.css']
})
export class GraficeComponent implements OnInit {
  useri: any;


  public doughnutChartLabels: string[]; //tre sa punem tarile aici

  //   for (let i = 0; i < this.getUseri().length; i++) {
  //
  // } mai intai cred ca ar trebui sa stabilesc tarile,gen sa le gasesc distinct
  public doughnutChartData: number[]; //aici trebe array-ul pe care l-am facut cu numerele ?1,2 da
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClickedTari(e: any): void {
    console.log(e);
  }

  public chartHoveredTari(e: any): void {
    console.log(e);
  }

  //regiuni
  public polarAreaChartLabels: string[];
  public polarAreaChartData: number[];
  public polarAreaLegend: boolean = true;

  public polarAreaChartType: string = 'polarArea';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  nuamInspiratie() {
    var urlToParse = location.search;
    var result = this.parseUrlParams(urlToParse);
    let useri = JSON.parse(JSON.stringify(result));   //pari obosita :)) stai potol acolo si watch this happening
    this.getUseri().then((useri: Array<any>) => {
      let tari = [];
      let tmp = [];
      useri.forEach((value, index) => {
        if (tari.indexOf(value.tara) == -1) {
          tari.push(value.tara);
          tmp.push(1);
        } else {
          tmp[tari.indexOf(value.tara)]++;
        }
      })

      this.doughnutChartData = tmp;
      this.doughnutChartLabels = tari;
    });
  }

  nuAmInspiratie2() {
    this.getRegiuni().then((obiective: Array<any>) => {
      let regiuni = [];
      let tmp = [];
      obiective.forEach((value,index) => {
        if(regiuni.indexOf(value.obiective.id_r) == -1){
          regiuni.push(value.obiective.id_r);
          tmp.push(1);
        }else{
          tmp[regiuni.indexOf(value.obiective.id_r)]++;
        }
      })

      for(let i=0;i<tmp.length;i++){ ///oook, cum vrei tu atunci
        if(regiuni[i] == 1) regiuni[i] = "Transilvania"; else
        if(regiuni[i] == 2) regiuni[i] = "Moldova"; else
        if(regiuni[i] == 3) regiuni[i] = "Dobrogea"; else
        if(regiuni[i] == 4) regiuni[i] = "Muntenia"; else
        if(regiuni[i] == 5) regiuni[i] = "Oltenia"; else
        if(regiuni[i] == 6) regiuni[i] = "Banat";
      }
      this.polarAreaChartLabels = regiuni;
      this.polarAreaChartData = tmp;
    })
  }

  constructor(private http: Http) {

  }

  ngOnInit() {
    this.nuamInspiratie();
    this.nuAmInspiratie2();
  }

  getRegiuni() {
    return new Promise((resolve) => {
      this.http.get('http://localhost:3000/getWishListDataChart') // ai ceva pe server ? pai cred ca trebuia sa luam din obiective,am inteles...deci din wishlist, iau obiectivele , ducred ca tre sa facem un join cu obiective, ca sa luam regiunea
      //stai ca nu mai pricep ...deci o regiune are mai multe obiective ?da, si pe grafic ce voiai ?cate obiective din wishlist sunt in fiecare regiune ...ok
      //deci, am luat aici obiectivele din wishlist,... acuma ar trebui sa numaram cate obiective sunt pt fiecare id_r oook.
        .map(res => res.json())
        .subscribe(response => { resolve(response); });
    })
  }

  getUseri() {
    return new Promise((resolve) => {
      this.http.get('http://localhost:3000/utilizatori')
        .map(res => res.json())
        .subscribe(response => { resolve(response); });
    })
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
  } //back, ce-ai mai facut ? pai imi amintisem ca luasem parametrii cu asta

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

}
