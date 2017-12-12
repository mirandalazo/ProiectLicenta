import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { StorageServiceService } from './storage-service.service';
import { CookieService } from 'ng2-cookies';

import { AppComponent } from './app.component';
import {DestinationsComponent} from './destinations/destinations.component';
import {AttractionsComponent} from './attractions/attractions.component';
import {WishlistComponent} from './wishlist/wishlist.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {NaturaComponent} from './natura/natura.component';
import {CulturaComponent} from './cultura/cultura.component';
import {ArhitectComponent} from './arhitect/arhitect.component';
import {GastroComponent} from './gastro/gastro.component';
import {ObiectivComponent} from './obiectiv/obiectiv.component';
import {ObiectivCulturaComponent} from './obiectivCultura/obiectivCultura.component';
import {RegiuneComponent} from './regiune/regiune.component';

import { routing } from './app.router';
import { HartaComponent } from './harta/harta.component';
import { ChartsModule } from 'ng2-charts';
import { GraficeComponent } from './grafice/grafice.component';

@NgModule({
  declarations: [
    AppComponent,
    DestinationsComponent,
    AttractionsComponent,
    WishlistComponent,
    RegisterComponent,
    LoginComponent,
    AboutComponent,
    HomeComponent,
    NaturaComponent,
    CulturaComponent,
    ArhitectComponent,
    GastroComponent,
    ObiectivComponent,
    ObiectivCulturaComponent,
    RegiuneComponent,
    HartaComponent,
    GraficeComponent
  ],
  //pai tre sa schimbam req peste tot staai
  imports: [
    LocalStorageModule.withConfig({
            prefix: 'app',
            storageType: 'localStorage'
        }),
    BrowserModule,
    FormsModule,
     HttpModule,
    JsonpModule,
    ChartsModule,
    routing
  ],
  providers: [StorageServiceService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
