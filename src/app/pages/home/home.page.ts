import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromHomeActions from './state/home.actions';
import * as fromHomeSelectors from './state/home.selectors'
import { CityWeather } from 'src/app/shared/models/weather.model';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  searchControl!: FormControl
  text!: string

  cityWeather$!: Observable<CityWeather>
  loading$!: Observable<boolean>
  error$!: Observable<boolean>

  constructor(
    private store: Store   
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required)

    this.cityWeather$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeather))
    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherLoading))
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherError))
    
  }

  doSearch(): void {
    const city = this.searchControl.value 
    this.store.dispatch(fromHomeActions.loadCurrentWeather(city))
  }

}
