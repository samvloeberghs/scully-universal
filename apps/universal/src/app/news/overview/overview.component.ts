import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

type Articles = Array<number>;

@Component({
  selector: 'su-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public articlesSource = '/assets/news-100.json';

  public readonly articles$ = this.httpClient.get<Articles>(`${environment.assetsUrl}${this.articlesSource}`);

  constructor(private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

}
