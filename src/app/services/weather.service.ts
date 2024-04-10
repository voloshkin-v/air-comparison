import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Geocoding } from '../interfaces/geocoding.interface';
import { AirPolution } from '../interfaces/airPolution.interface';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    constructor(private http: HttpClient) {}

    getGeocoding(location: string, limit = 5) {
        return this.http.get<Geocoding[]>(
            `${environment.apiBaseUrl}/geo/1.0/direct?q=${location}&limit=${limit}&appid=${environment.apiKey}`
        );
    }

    getAirPolutionData(lat: number, lon: number, name: string) {
        return this.http
            .get<AirPolution>(
                `${environment.apiBaseUrl}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${environment.apiKey}`
            )
            .pipe(
                map((response) =>
                    this.processAirPolutionResponse(response, name)
                )
            );
    }

    private processAirPolutionResponse(response: AirPolution, name: string) {
        return {
            name,
            aqi: response.list[0].main.aqi,
            co: response.list[0].components.co,
            no: response.list[0].components.no,
            no2: response.list[0].components.no2,
            o3: response.list[0].components.o3,
            so2: response.list[0].components.so2,
            pm2_5: response.list[0].components.pm2_5,
            pm10: response.list[0].components.pm10,
            nh3: response.list[0].components.nh3,
        };
    }
}
