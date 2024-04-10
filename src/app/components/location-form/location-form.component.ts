import { Component, OnInit, inject } from '@angular/core';
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
export class LocationFormComponent implements OnInit {
    LOCAL_STORAGE_KEY = 'locations-data';

    weatherService = inject(WeatherService);
    dataService = inject(DataService);

    locations: Geocoding[] = [];
    isSubmitted = false;
    errorMessage = '';
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

    ngOnInit() {
        this.selectedLocations?.valueChanges.subscribe((data) => {
            this.isSubmitted = false;

            if (!data?.length) {
                this.resetFormValues();
            }
        });

        const data = localStorage.getItem(this.LOCAL_STORAGE_KEY);
        if (!data) return;

        this.form.patchValue({
            selectedLocations: JSON.parse(data),
        });

        if (this.form.valid) {
            this.fetchPolutionData();
        }
    }

    onSearch(event: AutocompleteEvent) {
        this.weatherService.getGeocoding(event.query).subscribe(
            (data) => {
                this.locations = data;
            },
            (e) => {
                this.errorMessage = 'Could not fetch the data';
            }
        );
    }

    onSubmit() {
        this.isSubmitted = true;
        this.fetchPolutionData();
    }

    onReset(e: Event) {
        e.preventDefault();

        this.resetFormValues();
    }

    fetchPolutionData() {
        const locations = this.form.value.selectedLocations!;

        const queries = locations.map(({ lat, lon, name }) =>
            this.weatherService.getAirPolutionData(lat, lon, name)
        );

        forkJoin(queries).subscribe((data) => {
            this.dataService.setData(data);

            localStorage.setItem(
                this.LOCAL_STORAGE_KEY,
                JSON.stringify(locations)
            );
        });
    }

    resetFormValues() {
        this.form.reset();
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
        this.dataService.setData([]);
    }
}
