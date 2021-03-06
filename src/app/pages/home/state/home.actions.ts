import { createAction, props } from "@ngrx/store";

import { Bookmark } from "src/app/shared/models/bookmark.model";

export const loadCurrentWeather = createAction(
    '[Home - Weather API] Load Current Weather',
    props<{ query: string }>()
);

export const loadCurrentWeatherById = createAction(
    '[Home - Weather API] Load Current Weather By Id',
    props<{ id: string }>(),
);

export const loadCurrentWeatherSuccess = createAction(
    '[Home - Weather API] Load Current Weather Success',
    props<{ entity: any }>()
);

export const loadCurrentWeatherFailed = createAction(
    '[Home - Weather API] Load Current Weather Failed',
);

export const clearHomeState = createAction(
    '[Home] Clear Home',
);

export const toggleBookmark = createAction(
    '[Home] Toggle Bookmark',
    props<{ entity: Bookmark }>()
)