import { Component, OnDestroy, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from './location-card/location-card.component';
import { AirPolutionData } from '../../interfaces/airPolutionData.interface';
import { SortGroupComponent } from './sort-group/sort-group.component';

@Component({
    selector: 'comparison-container',
    standalone: true,
    imports: [CommonModule, LocationCardComponent, SortGroupComponent],
    templateUrl: './comparison-container.component.html',
    styleUrl: './comparison-container.component.scss',
})
export class ComparisonContainerComponent implements OnDestroy {
    dataService = inject(DataService);
    data: AirPolutionData[] = [];

    subscription = this.dataService.comparisonData$.subscribe((data) => {
        this.data = data;
    });

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onFilter() {
        console.log(this.data);
    }
}
