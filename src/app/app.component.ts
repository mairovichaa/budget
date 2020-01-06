import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" routerLink="/">Budget</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" routerLinkActive="active">
                        <a class="nav-link" routerLink="/date">Date</a>
                    </li>
                    <li class="nav-item" routerLinkActive="active">
                        <a class="nav-link" routerLink="/category">Category</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div style="margin-top: 10px">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
}
