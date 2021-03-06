import { createFeatureSelector, createSelector } from "@ngrx/store";

import { BookmarkState } from "./bookmarks.reducer";

export const selectBookmarkState = createFeatureSelector('bookmark')

export const selectBookmarkList = createSelector(
    selectBookmarkState,
    (bookmarkState: BookmarkState) => bookmarkState.list
)