import { UsersService } from '@/services';
import { IGetUsersResponse } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
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
  constructor(private readonly usersService: UsersService) {}

  //* Props
  result?: IGetUsersResponse;
  fetching = true;

  //* Hooks
  ngOnInit(): void {
    this.fetchUsers();
  }

  //* Handlers
  handlePageEvent(event: PageEvent) {
    this.fetchUsers(event.pageIndex + 1);
  }

  fetchUsers(page?: number) {
    this.fetching = true;
    //* Delay for preview
    this.usersService
      .get(page)
      .pipe(delay(250))
      .subscribe({
        next: (res) => {
          this.result = res;
          this.fetching = false;
        },
      });
  }
}
