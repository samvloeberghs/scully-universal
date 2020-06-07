import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { filter, map, pluck, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';

export interface UserDetail {
  name: string;
  bio: string
}

export interface UserDetailSafe {
  name: string;
  bio: SafeHtml
}

const userDetailStateKey = 'userDetail';

type UserArticles = Array<number>;
const userArticlesStateKey = 'userArticles';

@Component({
  selector: 'su-users-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public readonly userId$ = this.activatedRoute.params.pipe(pluck('id'));
  public readonly userDetail$: Observable<UserDetailSafe> = (
    isScullyGenerated()
      ? this.transferStateService.getState<UserDetail>(userDetailStateKey)
      : this.httpClient.get<UserDetail>('/assets/userdetail.json').pipe(
      tap(userDetail => this.transferStateService.setState<UserDetail>(userDetailStateKey, userDetail)))
  ).pipe(
    map(userDetail => {
      return {
        ...userDetail,
        full: this.domSanitizer.bypassSecurityTrustHtml(userDetail.bio)
      };
    }),
    shareReplay(1)
  );

  public readonly userArticles$ = isScullyGenerated()
    ? this.transferStateService.getState<UserArticles>(userArticlesStateKey)
    : this.httpClient.get<Array<number>>('/assets/news-100.json').pipe(
      withLatestFrom(this.userId$),
      map(([articles, userId]) => articles.filter(article => article % 10 === +userId)),
      tap(userArticles => this.transferStateService.setState<UserArticles>(userArticlesStateKey, userArticles))
    );

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly httpClient: HttpClient,
              private readonly transferStateService: TransferStateService,
              private readonly domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

}
