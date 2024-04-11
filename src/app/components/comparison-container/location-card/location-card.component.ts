import { Component, Input } from '@angular/core';
import { AirPolutionData } from '../../../interfaces/airPolutionData.interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'location-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './location-card.component.html',
    styleUrl: './location-card.component.scss',
})
export class LocationCardComponent {
    @Input() sortOption!: string;
    @Input() location!: AirPolutionData;
}
