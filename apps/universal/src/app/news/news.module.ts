import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '', component: OverviewComponent,
  },
  {
    path: ':id', component: DetailComponent
  }
];

@NgModule({
  declarations: [OverviewComponent, DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NewsModule { }
