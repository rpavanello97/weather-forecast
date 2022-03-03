import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CityWeather } from 'src/app/shared/models/weather.model';
import { Units } from 'src/app/shared/models/units.enum';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent {

   @Input() cityWeather: CityWeather;
   @Input() isFavorite: boolean;
   @Input() unit: Units;
   @Output() toggleBookmark = new EventEmitter();

   get cityName(): string {
     return `${this.cityWeather?.city?.name}, ${this.cityWeather?.city?.country}`
   }

   onToggleBookmark(): void {
     this.toggleBookmark.emit();
   }

}
