import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BackupsComponent} from "./backups.component";
import {ErrorModalComponent} from "./error-modal.component";

@NgModule({
    declarations: [
        BackupsComponent,
        ErrorModalComponent
    ],
    imports: [
        CommonModule
    ]
})
export class BackupModule {
}
