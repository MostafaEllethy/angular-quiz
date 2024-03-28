import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, delay, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsersService } from '@/services';
import { IUser } from '@/types';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-search',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './users-search.component.html',
  styleUrl: './users-search.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
  ],
})
export class UsersSearchComponent implements OnInit, OnDestroy {
  //* Constructor
  constructor(private readonly usersService: UsersService) {}

  //* Views
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  //* Props
  form = new FormGroup({
    query: new FormControl(''),
  });
  subs = new Subscription();
  searching = false;
  user: IUser | null = null;

  //* Computed Props
  get query() {
    return this.form.controls.query.value;
  }

  //* Hooks
  ngOnInit(): void {
    //* Watch input changes
    this.subs.add(
      this.form.controls.query.valueChanges
        .pipe(debounceTime(150), distinctUntilChanged())
        .subscribe({
          next: (input) => {
            const query = (input ?? '').trim();

            if (query) {
              this.searching = true;
              this.usersService
                .find(query)
                //* Delay for demo to present spinner
                .pipe(delay(150))
                .subscribe({
                  next: (result) => {
                    this.user = result.data;
                    this.menuTrigger.openMenu();
                    this.searching = false;
                  },
                  error: () => {
                    this.menuTrigger.closeMenu();
                    this.searching = false;
                  },
                });
            } else {
              this.menuTrigger.closeMenu();
            }
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  //* Handlers
  clearInput() {
    this.form.patchValue({ query: '' });
    this.menuTrigger.closeMenu();
  }
}
