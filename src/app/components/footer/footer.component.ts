import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    social = [
        {
            iconClass: 'pi pi-github text-white',
            href: 'https://github.com/voloshkin-v/air-comparison',
        },
        {
            iconClass: 'pi pi-linkedin text-white',
            href: 'https://www.linkedin.com/in/vvoloshyn/',
        },
    ];
}
