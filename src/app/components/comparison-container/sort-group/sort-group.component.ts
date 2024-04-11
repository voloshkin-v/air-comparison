import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SortOption } from '../../../interfaces/sortOption.interface';

interface DropdownChangeEvent {
    originalEvent: Event;
    value: SortOption;
}

@Component({
    selector: 'sort-group',
    standalone: true,
    imports: [CommonModule, FormsModule, DropdownModule],
    templateUrl: './sort-group.component.html',
    styleUrl: './sort-group.component.scss',
})
export class SortGroupComponent {
    options!: SortOption[];
    selectedOption?: SortOption;

    @Output() selected = new EventEmitter();

    ngOnInit() {
        this.options = [
            { label: 'Air Quality Index', order: 'asc', key: 'aqi' },
            { label: 'Air Quality Index', order: 'desc', key: 'aqi' },
            { label: 'CO', order: 'asc', key: 'co' },
            { label: 'CO', order: 'desc', key: 'co' },
        ];
    }

    onSortingChange(event: DropdownChangeEvent) {
        this.selected.emit(event.value);
    }
}
