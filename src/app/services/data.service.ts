import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AirPolutionData } from '../interfaces/airPolutionData.interface';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private comparisonData = new Subject<AirPolutionData[]>();
    comparisonData$ = this.comparisonData.asObservable();

    setData(data: AirPolutionData[]) {
        this.comparisonData.next(data);
    }
}
