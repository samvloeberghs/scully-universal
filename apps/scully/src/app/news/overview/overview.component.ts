import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { tap } from 'rxjs/operators';

type Articles = Array<number>;
const articlesStateKey = 'articles';

@Component({
  selector: 'su-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public readonly articles$ = isScullyGenerated()
    ? this.transferStateService.getState<Articles>(articlesStateKey)
    : this.httpClient.get<Array<number>>('/assets/news-100.json').pipe(
      tap(articles => this.transferStateService.setState<Articles>(articlesStateKey, articles)));

  constructor(private readonly httpClient: HttpClient,
              private readonly transferStateService: TransferStateService) {
  }

  ngOnInit(): void {
  }

}
