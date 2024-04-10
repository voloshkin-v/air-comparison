import { Component } from '@angular/core';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { ComparisonContainerComponent } from './components/comparison-container/comparison-container.component';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        LocationFormComponent,
        ComparisonContainerComponent,
        DividerModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
