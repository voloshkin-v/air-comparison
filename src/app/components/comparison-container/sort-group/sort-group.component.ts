import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface Option {
    label: string;
    order: 'asc' | 'desc';
}

@Component({
    selector: 'sort-group',
    standalone: true,
    imports: [CommonModule, FormsModule, DropdownModule],
    templateUrl: './sort-group.component.html',
    styleUrl: './sort-group.component.scss',
})
export class SortGroupComponent {
    options: Option[] | undefined;
    selectedOption: Option | undefined;

    ngOnInit() {
        this.options = [
            { label: 'Air Quality Index', order: 'asc' },
            { label: 'Air Quality Index', order: 'desc' },
        ];
    }
}
