import { createAction, props } from "@ngrx/store";

import { Bookmark } from "src/app/shared/models/bookmark.model";

export const removeBookmark = createAction(
    '[Bookmark] Remove Bookmark',
    props<{ id: number }>()
)

export const toggleBookmarById = createAction(
    '[Bookmark] Toggle Bookmarks By Id',
    props<{ id: number }>(),
  );
  
  export const updateBookmarksList = createAction(
    '[Bookmark] Update Bookmarks List',
    props<{ list: Bookmark[] }>(),
  );