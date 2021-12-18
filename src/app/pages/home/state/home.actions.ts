import { createAction, props } from "@ngrx/store";

import { Bookmark } from "src/app/shared/models/bookmark.model";

export const loadCurrentWeather = createAction(
    '[Home - Weather API] Load Current Weather',
    props<{ query: string }>()
);

export const loadCurrentWeatherSuccess = createAction(
    '[Home - Weather API] Load Current Weather Success',
    props<{ entity: any }>()
);

export const loadCurrentWeatherFailed = createAction(
    '[Home - Weather API] Load CUrrent Weather Failed',
);

export const toggleBookmark = createAction(
    '[Home] Toggle Bookmark',
    props<{ entity: Bookmark }>()
)