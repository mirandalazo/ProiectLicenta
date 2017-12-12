import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import {HartaComponent} from './harta/harta.component';
import{GraficeComponent} from'./grafice/grafice.component';

export const routes: Routes = [
  {path: '',            component: HomeComponent },
  {path: 'home',        component: HomeComponent },
  {path: 'about',       component: AboutComponent },
  {path:'destinations', component:DestinationsComponent},
  {path:'attractions', component:AttractionsComponent},
  {path:'wishlist', component:WishlistComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'natura', component:NaturaComponent},
  {path:'cultura', component:CulturaComponent},
  {path:'arhitect', component:ArhitectComponent},
  {path:'gastro', component:GastroComponent},
  {path:'obiectiv', component:ObiectivComponent},
  {path:'obiectivCultura', component:ObiectivCulturaComponent},
  {path:'regiune', component:RegiuneComponent},
  {path:'harta', component:HartaComponent},
  {path:'grafice', component:GraficeComponent},
  {path: '*',           component: HomeComponent }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
