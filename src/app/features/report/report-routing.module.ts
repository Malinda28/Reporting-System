import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityReportComponent } from './activity-report/activity-report.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
