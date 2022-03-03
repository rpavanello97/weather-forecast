import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ComponentPortal, DomPortalOutlet, PortalOutlet } from '@angular/cdk/portal';

import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { CityWeather } from 'src/app/shared/models/weather.model';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityTypeaheadItem } from 'src/app/shared/models/city-typeahead-item.model';
import { UnitSelectorComponent } from '../unit-selector/unit-selector.component';
import { Units } from 'src/app/shared/models/units.enum';

import * as fromHomeActions from '../../state/home.actions';
import * as fromHomeSelectors from '../../state/home.selectors'
import * as fromBookmarksSelectors from '../../../bookmarks/state/bookmark.selectors';
import * as fromConfigSelectors from '../../../../shared/state/config/config.selectos';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  searchControl!: FormControl
  searchControlWithAutoComplete: FormControl  

  cityWeather$: Observable<CityWeather>;
  cityWeather: CityWeather;
  loading$: Observable<boolean> = new Observable<boolean>();
  error$: Observable<boolean> = new Observable<boolean>();

  bookmarksList$: Observable<Bookmark[]>;
  isCurrentFavorite$: Observable<boolean>;

  unit$: Observable<Units>;

  private componentDestroyed$ = new Subject()

  private portalOutlet: PortalOutlet;  

  constructor(
    private store: Store,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required)
    this.searchControlWithAutoComplete = new FormControl(undefined)
    this.searchControlWithAutoComplete.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value: CityTypeaheadItem) => {
        if (!!value) {
          this.store.dispatch(fromHomeActions.loadCurrentWeatherById({ id: value.geonameid.toString() }));
        }
      })



    this.cityWeather$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeather));
    this.cityWeather$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(value => this.cityWeather = value);

    //Another form to do the same thing above.
    // this.store.pipe(
    //   select(fromHomeSelectors.selectCurrentWeather),
    //   takeUntil(this.componentDestroyed$)
    // ).subscribe(data => this.cityWeather = data);

    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherError));

    this.bookmarksList$ = this.store.pipe(select(fromBookmarksSelectors.selectBookmarkList));

    this.isCurrentFavorite$ = combineLatest([this.cityWeather$, this.bookmarksList$])
      .pipe(
        map(([current, bookmarkList]) => {
          if (!!current) {
            return bookmarkList.some(bookmark => bookmark.id === current.city.id);
          }
          return false;
        }),
      );

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));

    this.setupPortal();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(fromHomeActions.clearHomeState());
    this.portalOutlet.detach();
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

  private setupPortal() {
    const el = document.querySelector('#navbar-portal-outlet');
    this.portalOutlet = new DomPortalOutlet(
      el,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    this.portalOutlet.attach(new ComponentPortal(UnitSelectorComponent));
  }
}
