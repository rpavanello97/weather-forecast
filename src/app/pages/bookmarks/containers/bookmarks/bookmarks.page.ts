import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Bookmark } from 'src/app/shared/models/bookmark.model';
import * as fromBookmarkSelector from './../../state/bookmark.selectors';
import * as fromBookmarlActions from './../../state/bookmarks.actions';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss']
})
export class BookmarksPage implements OnInit {

  // bookmarks: Bookmark[]
  bookmarks$: Observable<Bookmark[]>

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    // this.store.pipe(select(fromBookmarkSelector.selectBookmarkList)).subscribe(data => {
    //   this.bookmarks = data
    // })

    this.bookmarks$ = this.store.pipe(select(fromBookmarkSelector.selectBookmarkList))
  }

  removeFromFavorites(id: number): void {
    this.store.dispatch(fromBookmarlActions.removeBookmark({ id }))
  }

}
