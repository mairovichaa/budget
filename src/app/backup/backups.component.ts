import {Component, OnInit} from "@angular/core";
import {Backup, BackupService} from "./backup.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ErrorModalComponent} from "./error-modal.component";

@Component({
    selector: 'per-day',
    template: `
        <button class="btn btn-primary" style="margin-left: 10px" 
                [disabled]="isCreationInProgress" (click)="createBackup()">Create backup
        </button>
        <div [hidden]="!isCreationInProgress">Creation of backup in progress</div>

        <ul class="list-group" style="width: 500px; margin-top: 10px; margin-left: 10px">
            <li *ngFor="let backup of backups.reverse()" class="list-group-item">{{backup.filename}}</li>
        </ul>
    `,
    styles: []
})
export class BackupsComponent implements OnInit {

    isCreationInProgress: Boolean = false;
    backups: Backup[];

    constructor(
        private backupService: BackupService,
        private modalService: NgbModal
    ) {
    }

    async ngOnInit(): Promise<void> {
        console.log(`ngOnInit started`);
        this.backups = await this.backupService.list().toPromise();
        this.backups.sort((a, b) => a.filename.localeCompare(b.filename))
        console.log(`ngOnInit finished`);
    }

    async createBackup() {
        console.log(`Create backup`);
        this.showProgressBar();
        try {
            const res = await this.backupService.create().toPromise();
            console.log(`Backup was created`);
            console.log(`Response ${JSON.stringify(res)}`);
            this.backups.push(res);
            this.hideProgressBar();
        } catch (error) {
            console.log(`Response ${JSON.stringify(error)}`);
            this.showErrorPopup(error);
        }
    }

    private showProgressBar() {
        console.log(`Show progress bar`);
        this.isCreationInProgress = true;
    }

    private hideProgressBar() {
        console.log(`Hide progress bar`);
        this.isCreationInProgress = false;
    }

    private showErrorPopup(error: any) {
        const modalRef = this.modalService.open(ErrorModalComponent);
        modalRef.componentInstance.msg = JSON.stringify(error);
        modalRef.result.finally(this.hideProgressBar.bind(this));
    }
}