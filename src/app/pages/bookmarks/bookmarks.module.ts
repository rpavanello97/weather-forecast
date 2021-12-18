import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { BookmarksPage } from './containers/bookmarks/bookmarks.page';
import { bookmarkReducer} from './state/bookmarks.reducer'


@NgModule({
  declarations: [
    BookmarksPage,    
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('bookmark', bookmarkReducer)
  ]
})
export class BookmarksModule { }
