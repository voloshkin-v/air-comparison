import { Component, OnDestroy, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'comparison-container',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './comparison-container.component.html',
    styleUrl: './comparison-container.component.scss',
})
export class ComparisonContainerComponent implements OnDestroy {
    dataService = inject(DataService);
    
    data: any = [];
    subscription = this.dataService.comparisonData$.subscribe((data) => {
        this.data = data;
    });

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
