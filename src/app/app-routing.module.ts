import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryOverviewComponent} from "./category-overview.component";
import {DateOverviewComponent} from "./date-overview.component";

const routes: Routes = [
  { path: 'category', component: CategoryOverviewComponent },
  { path: 'date', component: DateOverviewComponent},
  { path: '',
    redirectTo: '/date',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
