import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <category-overview></category-overview>
        <year-list></year-list>
    `,
    styles: [
        'year-list {float: left; margin-left: 20px}'
    ]
})
export class AppComponent {
}
