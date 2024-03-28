import { UsersService } from '@/services';
import { IUser } from '@/types';
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinner,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  //* Props
  fetching = true;
  error = false;
  user?: IUser;

  //* Constructor
  constructor(
    public readonly location: Location,
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute
  ) {}

  //* Hooks
  ngOnInit(): void {
    this.usersService.find(this.route.snapshot.paramMap.get('id')!).subscribe({
      next: ({ data }) => {
        this.user = data;
        this.fetching = false;
      },
      error: () => (this.error = true),
    });
  }
}
