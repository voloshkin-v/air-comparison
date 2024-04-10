import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationFormComponent } from './components/location-form/location-form.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LocationFormComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
