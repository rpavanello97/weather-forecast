import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomePage } from './containers/home/home.page';
import { homeReducer } from './state/home.reducer';
import { HomeEffects } from './state/home.effects';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomePage,
    CurrentWeatherComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    ComponentsModule,
    RouterModule, 
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects])
  ]
})
export class HomeModule { }
