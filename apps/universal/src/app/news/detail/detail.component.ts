import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map, pluck, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface NewsDetail {
  short: string;
  full: string
}

interface NewsDetailSafe {
  short: string;
  full: SafeHtml
}

@Component({
  selector: 'su-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private readonly newsDetailSource = '/assets/newsdetail.json';

  public readonly newsId$ = this.activatedRoute.params.pipe(pluck('id'));
  public readonly newsDetail$: Observable<NewsDetailSafe> = this.httpClient.get<NewsDetail>(
    `${environment.assetsUrl}${this.newsDetailSource}`
  ).pipe(
    map(newsDetail => {
      return {
        ...newsDetail,
        full: this.domSanitizer.bypassSecurityTrustHtml(newsDetail.full)
      };
    }),
    shareReplay(1)
  );

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly httpClient: HttpClient,
              private readonly domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

}
