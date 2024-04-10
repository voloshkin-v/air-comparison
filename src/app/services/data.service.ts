import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    // Array
    private comparisonData = new Subject<any>();
    comparisonData$ = this.comparisonData.asObservable();

    setData(data: any) {
        this.comparisonData.next(data);
    }
}