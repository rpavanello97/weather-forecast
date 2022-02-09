import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityTypeaheadItem } from 'src/app/shared/models/city-typeahead-item.model';
import { BookmarkState } from '../../state/bookmarks.reducer';
import * as fromBookmarkSelector from './../../state/bookmark.selectors';
import * as fromBookmarkActions from './../../state/bookmarks.actions';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss']
})
export class BookmarksPage implements OnInit, OnDestroy {

  // bookmarks: Bookmark[]
  bookmarks$: Observable<Bookmark[]>

  searchTypeaheadControl = new FormControl(undefined)

  private componentDestroyed$ = new Subject()

  constructor(private store: Store<BookmarkState>) { }

  ngOnInit(): void {
    // this.store.pipe(select(fromBookmarkSelector.selectBookmarkList)).subscribe(data => {
    //   this.bookmarks = data
    // })

    this.bookmarks$ = this.store.pipe(select(fromBookmarkSelector.selectBookmarkList))

    this.searchTypeaheadControl.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value: CityTypeaheadItem) => {
        this.store.dispatch(fromBookmarkActions.toggleBookmarById({ id: value.geonameid }))
      })
  }

  ngOnDestroy() {
    this.componentDestroyed$.next()
    this.componentDestroyed$.unsubscribe()
  }

  removeFromFavorites(id: number): void {
    this.store.dispatch(fromBookmarkActions.removeBookmark({ id }))
  }

}
