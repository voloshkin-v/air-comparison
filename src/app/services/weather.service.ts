import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Geocoding } from '../interfaces/geocoding.interface';
import { AirPolution } from '../interfaces/airPolution.interface';

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

    getAirPolutionData(lat: number, lon: number) {
        return this.http.get<AirPolution>(
            `${environment.apiBaseUrl}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${environment.apiKey}`
        );
    }
}
