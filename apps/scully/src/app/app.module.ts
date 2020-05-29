import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ScullyLibModule,
    RouterModule.forRoot([{
      path: '',
      component: HomeComponent
    },{
      path: 'news',
      loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
    }], { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
