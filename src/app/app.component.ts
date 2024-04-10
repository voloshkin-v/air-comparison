import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { ComparisonContainerComponent } from './components/comparison-container/comparison-container.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [LocationFormComponent, ComparisonContainerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
