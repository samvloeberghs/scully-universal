import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserStateInterceptor } from './interceptors/browserstate.interceptor';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    HttpClientModule,
    RouterModule.forRoot([{
        path: '',
        component: HomeComponent
    }, {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
    }], { initialNavigation: 'enabled' }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BrowserStateInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
