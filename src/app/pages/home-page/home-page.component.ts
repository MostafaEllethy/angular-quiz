import { UsersService } from '@/services';
import { IGetUsersResponse } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  //* Constructor
  constructor(
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  //* Props
  result?: IGetUsersResponse;
  fetching = true;

  //* Hooks
  ngOnInit(): void {
    //* Check if page number exist in url
    const page = parseInt(this.route.snapshot.queryParamMap.get('page') ?? '1');

    this.fetchUsers(page);
  }

  //* Handlers
  handlePageEvent(event: PageEvent | number) {
    const page = typeof event === 'number' ? event : event.pageIndex + 1;

    this.fetchUsers(page);

    //* Set query params
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  fetchUsers(page?: number) {
    this.fetching = true;
    //* Delay for preview
    this.usersService
      .get(page)
      .pipe(delay(150))
      .subscribe({
        next: (res) => {
          this.result = res;
          this.fetching = false;
        },
      });
  }
}
