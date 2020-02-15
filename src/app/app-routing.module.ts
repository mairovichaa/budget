import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryOverviewComponent} from "./category/category-overview.component";
import {DateOverviewComponent} from "./date/date-overview.component";
import {MortgageComponent} from "./mortgage/mortgage.component";

const routes: Routes = [
  { path: 'category', component: CategoryOverviewComponent },
  { path: 'date', component: DateOverviewComponent},
  { path: 'mortgage', component: MortgageComponent},
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
