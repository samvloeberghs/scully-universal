import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { tap } from 'rxjs/operators';

type Users = Array<{
  id: number;
  slug: string;
}>;
const usersStateKey = 'users';

@Component({
  selector: 'su-users-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public readonly users$ = isScullyGenerated()
    ? this.transferStateService.getState<Users>(usersStateKey)
    : this.httpClient.get<Users>('/assets/users-10.json').pipe(
      tap(users => this.transferStateService.setState<Users>(usersStateKey, users))
    );

  constructor(private readonly httpClient: HttpClient,
              private readonly transferStateService: TransferStateService) {
  }

  ngOnInit(): void {
  }

}
