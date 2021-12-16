import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { City, CityWeather } from 'src/app/shared/models/weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent {

   @Input() cityWeather: CityWeather

   get cityName(): string {
     return `${this.cityWeather?.city?.name} ${this.cityWeather?.city?.country}`
   }

}
