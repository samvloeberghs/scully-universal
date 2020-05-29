import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail/detail.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '', component: OverviewComponent,
  },
  {
    path: ':id', component: DetailComponent
  }
];

@NgModule({
  declarations: [DetailComponent, OverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NewsModule {
}
