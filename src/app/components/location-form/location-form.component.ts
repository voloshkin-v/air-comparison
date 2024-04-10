import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {
    FormControl,
    FormGroup,
    FormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { Geocoding } from '../../interfaces/geocoding.interface';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { forkJoin } from 'rxjs';

interface AutocompleteEvent {
    originalEvent: Event;
    query: string;
}

interface Location {
    lat: number;
    lon: number;
    name: string;
}

@Component({
    selector: 'location-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        AutoCompleteModule,
        SelectButtonModule,
    ],
    templateUrl: './location-form.component.html',
    styleUrl: './location-form.component.scss',
})
export class LocationFormComponent {
    weatherService = inject(WeatherService);
    dataService = inject(DataService);

    locations: Geocoding[] = [];
    form = new FormGroup({
        selectedLocations: new FormControl<Geocoding[]>(
            [],
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(4),
            ]
        ),
    });
    get selectedLocations() {
        return this.form.get('selectedLocations');
    }

    onSearch(event: AutocompleteEvent) {
        this.weatherService.getGeocoding(event.query).subscribe((data) => {
            this.locations = data;
        });
    }

    onSubmit() {
        const queries = this.form.value.selectedLocations!.map((location) =>
            this.weatherService.getAirPolutionData(location.lat, location.lon)
        );

        forkJoin(queries).subscribe((data) => {
            this.dataService.setData(data);
        });
    }
}
