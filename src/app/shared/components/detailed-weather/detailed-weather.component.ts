import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Weather } from '../../models/weather.model';
import { Units } from '../../models/units.enum';
import { unitToSymbol } from '../../util/units.utils';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedWeatherComponent {

  @Input() weather: Weather;
  @Input() unit: Units;

  get weatherIcon() {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`
  }

  get unitSymbol(): string {
    return unitToSymbol(this.unit);
  }

}
