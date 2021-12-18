import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as fromHomeActions from '../../state/home.actions';
import * as fromHomeSelectors from '../../state/home.selectors'
import { CityWeather } from 'src/app/shared/models/weather.model';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { Bookmark } from 'src/app/shared/models/bookmark.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  searchControl!: FormControl

  cityWeather: CityWeather;
  loading$: Observable<boolean> = new Observable<boolean>();
  error$: Observable<boolean> = new Observable<boolean>();

  private componentDestroyed$ = new Subject()

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required)

    this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeather),
      takeUntil(this.componentDestroyed$)
    ).subscribe(data => this.cityWeather = data);

    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherError));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  doSearch(): void {
    var query = this.searchControl.value
    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }))
  }

  onToggleBookmark(): void {
    const bookmark = new Bookmark()
    bookmark.coord = this.cityWeather.city.coord;
    bookmark.country = this.cityWeather.city.country;
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;

    this.store.dispatch(fromHomeActions.toggleBookmark({ entity: bookmark }));
  }

}
