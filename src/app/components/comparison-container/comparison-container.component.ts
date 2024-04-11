import { Component, OnDestroy, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from './location-card/location-card.component';
import { AirPolutionData } from '../../interfaces/airPolutionData.interface';
import { SortGroupComponent } from './sort-group/sort-group.component';
import { SortOption } from '../../interfaces/sortOption.interface';

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

    sortOption = '';

    subscription = this.dataService.comparisonData$.subscribe((data) => {
        this.data = data;
    });

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSort(option: SortOption) {
        this.sortOption = option.key;

        const sortObj = {
            asc: (a: AirPolutionData, b: AirPolutionData) =>
                a[option.key] - b[option.key],
            desc: (a: AirPolutionData, b: AirPolutionData) =>
                b[option.key] - a[option.key],
        };

        const sorted = this.data
            .slice()
            .sort((a, b) => sortObj[option.order](a, b));

        this.data = sorted;
    }
}
