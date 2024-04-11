import { Component } from '@angular/core';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { ComparisonContainerComponent } from './components/comparison-container/comparison-container.component';
import { DividerModule } from 'primeng/divider';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        LocationFormComponent,
        ComparisonContainerComponent,
        DividerModule,
        FooterComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
