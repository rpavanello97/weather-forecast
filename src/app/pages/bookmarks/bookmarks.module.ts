import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { BookmarksPage } from './containers/bookmarks/bookmarks.page';
import { bookmarkReducer} from './state/bookmarks.reducer'
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { BookmarksEffects } from './state/bookmark.effects';


@NgModule({
  declarations: [
    BookmarksPage,    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    StoreModule.forFeature('bookmark', bookmarkReducer),
    EffectsModule.forFeature([BookmarksEffects]),
  ]
})
export class BookmarksModule { }
