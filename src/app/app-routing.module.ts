import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WeatherDataComponent } from './components/weather-data/weather-data.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { WeatherHourlyComponent } from './components/weather-hourly/weather-hourly.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: WeatherDataComponent },
  { path: '', redirectTo: '/dashboard', pathMatch:'full' },
  { path: 'weather-details/:searchTerm', component: WeatherDetailsComponent },
  { path: 'hourly', component: WeatherHourlyComponent },
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

/*export const routedComponents = [NameComponent];*/