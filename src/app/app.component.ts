import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { environment } from './../environments/environment';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    private weatherService = inject(WeatherService);

    ngOnInit() {
        this.weatherService
            .getGeocoding('London')
            .subscribe((data) => console.log(data));
    }
}
