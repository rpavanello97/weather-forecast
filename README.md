# WeatherForecast

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## To do
create actions home.actions.ts
    loadCurrentWeather
        when search btn is clicked
        props -> query: string
	loadCurrentWeatherSuccess
        feature -> Weather API Load Current Weather Success
        props -> ent: any
	loadCurrentWeatherFailed
        feature -> Weather API Load Current Weather Failed
        props -> ent: any

home.reducer.ts
    inside HomeState interface
        entity: any
        loading: boolean
        error: boolean 
    inside reducer
        change the initial state
        put the loadCurrentWeather with 'on' and change the loading value to true and error value to false
        put the loadCurrentWeatherSuccess with 'on' and change the loading value to false and get the entity
        put the loadCurrentWeatherFailed with 'on' and change the loading value to false the error to true

home.effects.ts
    create loadCurrentWeather$ effect with createEffect(). it will received a 'query' check the code in video

ng g s shared/services/weather --skipTest true
    import HttpClient in constructor and Http ClientModule in app.module
    new method getCityWeatherByQuery(query: string): Observable<any>
        create params to pass q: query
        call the doGet method and make a pipe to get the return calling the 'responseToCityWeather' function
    new private method doGet<T>(url, params: HttpParams): Observable<T> { }
        append apiKey to params
        append lang ptBR to params

Current Weather Data API
    by city name
    get the url to put in doGet

Put the WeatherService in constructor inside the home.effects.ts to call the api 
        
    