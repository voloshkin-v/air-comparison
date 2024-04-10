import { Component, Input } from '@angular/core';
import { AirPolutionData } from '../../../interfaces/airPolutionData.interface';

@Component({
    selector: 'location-card',
    standalone: true,
    imports: [],
    templateUrl: './location-card.component.html',
    styleUrl: './location-card.component.scss',
})
export class LocationCardComponent {
    @Input() location!: AirPolutionData;
}
